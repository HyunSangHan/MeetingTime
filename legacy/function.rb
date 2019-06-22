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

CASH_TO_HEART = 1
HEART_TO_SCORE = 1000
private
def check_session 
    return User.find(session["user_id"])
end

def get_meeting_info
    MeetingDetail.where("meeting_date > ?", Time.now().to_datetime)
                  .where("starting_date < ?", Time.now().to_datetime).take
end
#####



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