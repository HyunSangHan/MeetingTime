require 'sinatra'
require 'bcrypt'
require './db_class.rb'
enable :sessions

###################################################################################################

# <NOTICE>: 'check session' is a justifed function!

# [Function]
# : check_session, get_meeting_info, join, assign_first_score, get_ranking_result, get_cutline, use_heart, use_cash

# [Controller]
# : POST - login_process, sign_up_process, edit_my_info_process, invite, find_lost_password
# : GET - login, sign_up, heart_payment, cash_payment, logout, secession, get_matching_result, get_my_info

# and..... please think more
###################################################################################################

DEFAULT_SCORE_RATE = 100
CASH_TO_HEART = 1
HEART_TO_SCORE = 1000
COUNT_LIMIT = 9999
private
def check_session 
    return User.find(session["user_id"])
end

def get_meeting_info
    MeetingDetail.where("meeting_date > ?", Time.now().to_datetime)
                  .where("starting_date < ?", Time.now().to_datetime).take
end

def join_clicked
    user = check_session
    meeting = get_meeting_info
    if user.nil?
        redirect '/' #redirection should be in Sinatra files.
    else
        joined_user = JoinedUser.new    
        joined_user.user = user
        joined_user.total_score = 0 # will be added when making cutline
        joined_user.meeting_detail_id = meeting
        joined_user.is_deleted = false

        all_users = meeting.joined_users
        male_count = all_users.where(:is_male => true).count
        female_count = all_users.where(:is_male => false).count

        if user.is_male == true
            joined_user.ranking = male_count
            joined_user.midranking = male_count
        else
            joined_user.ranking = female_count
            joined_user.midranking = female_count
        end
        joined_user.save
    end
    return joined_user.ranking
end

def assign_first_score # MUST check if all cases are included
    meeting = get_meeting_info
    all_users = meeting.joined_users
    cutline = meeting.cutline

    i = cutline
    count = 0
    while 0 < i # for winner
        count = count + 1 
        break if count > COUNT_LIMIT
        my = all_users.where("ranking" => i).take
        my.score = DEFAULT_SCORE_RATE + (cutline - my.ranking).to_i * DEFAULT_SCORE_RATE
        my.save
        i -= 1
    end

    i = cutline 
    count = 0
    while i < cutline + DEFAULT_SCORE_RATE # for loser
        count = count + 1 
        break if count > COUNT_LIMIT
        i += 1
        my = all_users.where("ranking" => i).take
        my.score = DEFAULT_SCORE_RATE - (my.ranking - cutline).to_i #check if it's int or string
        break if my.score == 0
        my.save 
    end
end

def make_ranking_result
    meeting =  get_meeting_info #have to edit! (have to get last meeting)
    all_users = meeting.joined_users
    male_users = all_users.where(:is_male => true)
    female_users = all_users.where(:is_male => false)

    male_users.order("total_score DESC").each_with_index do |xy, i|
        xy.ranking = i + 1
        xy.save
    end

    female_users.order("total_score DESC").each_with_index do |xx, j|
        xx.ranking = j + 1
        xx.save
    end
    
    return all_users
end

def get_cutline    
    meeting = get_meeting_info
    all_users = meeting.joined_users
    #doo2's comment ----> all_users = JoinedUser.where(:meeting_detail_id = meeting.id)
                          
    female_count = all_users.where(:is_male => false).count
    male_count = all_users.where(:is_male => true).count
    puts female_count
    puts male_count
    cutline = [female_count, male_count].min
    meeting.cutline = cutline
    meeting.save

    return cutline
end

def use_heart heart_payment_params
    user = check_session
    meeting = get_meeting_info
    joined_user = meeting.joined_users.find(session["user_id"]) #need check

    total_score = joined_user.total_score

    heart_payment = HeartPayment.new
    heart_payment.user = user
    #heart_payment.heart_paid = params["heart_payment"]
    heart_payment.heart_paid = heart_payment_params

    joined_user.total_score = joined_user.total_score + (heart_payment.heart_paid * HEART_TO_SCORE)
    user.current_heart = user.current_heart - heart_payment.heart_paid

    heart_payment.save
    user.save
    return heart_payment
end

def use_cash cash_payment_params
    user = check_session
    cash_payment = CashPayment.new
    cash_payment.user = user
    cash_payment.cash_paid = cash_payment_params
    cash_payment.heart_gotten = cash_payment.cash_paid * CASH_TO_HEART 
    cash_payment.save

    user.current_heart = user.current_heart + cash_payment.heart_gotten
    user.save
    return cash_payment
end