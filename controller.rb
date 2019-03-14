require 'sinatra'
require 'bcrypt'
require './db_class.rb'
require './function.rb'
enable :sessions


############# Question: How to get params in using React?

DEFAULT_SCORE_RATE = 1000
COUNT_LIMIT = 9999


# get '/' do 
#     if !session["user_id"].nil?
#         redirect '/main'
#     else
#         erb :initpage
#     end
# end

get '/get_user_info' do
    user = User.find(session["user_id"])
    return user.to_json
end

get '/get_meeting_info_first' do
    meeting = MeetingDetail.where("meeting_date > ?", Time.now().to_datetime)
                            .where("starting_date < ?", Time.now().to_datetime).take
    return meeting.to_json
end

get '/get_meeting_info_cutline' do    
    meeting = MeetingDetail.where("meeting_date > ?", Time.now().to_datetime)
                            .where("starting_date < ?", Time.now().to_datetime).take
    all_users = meeting.joined_users
                          
    female_count = all_users.where(:is_male => false).count
    male_count = all_users.where(:is_male => true).count
    cutline = [female_count, male_count].min
    meeting.cutline = cutline
    meeting.save

    return meeting.to_json
end

get '/get_joined_user_info' do
    user = User.find(session["user_id"])
    meeting = MeetingDetail.where("meeting_date > ?", Time.now().to_datetime)
                            .where("starting_date < ?", Time.now().to_datetime).take
    my = JoinedUser.where("user_id" => user.id)
                    .where("meeting_detail_id" => meeting.id).take

    if my.nil?
        my = JoinedUser.new    
        my.user = user
        my.total_score = 0 # will be added when making cutline 1000
        my.meeting_detail_id = meeting
        my.is_male = user.is_male
        my.is_deleted = false

        all_users = meeting.joined_users
        male_count = all_users.where(:is_male => true).count
        female_count = all_users.where(:is_male => false).count

        if user.is_male == true
            my.ranking = male_count + 1
            my.midranking = male_count + 1
        else
            my.ranking = female_count + 1
            my.midranking = female_count + 1
        end
        my.save
    else
        puts "You already joined this meeting. Please wait"
    end

    return my.to_json
end

get '/assign_first_score' do
# MUST check if all cases are included
    meeting = MeetingDetail.where("meeting_date > ?", Time.now().to_datetime)
                            .where("starting_date < ?", Time.now().to_datetime).take
    all_users = meeting.joined_users
    cutline = meeting.cutline

    i = cutline
    count = 0 # for making break condition
    while 0 < i # for winner
        count = count + 1 
        break if count > COUNT_LIMIT
        my = all_users.where("ranking" => i).take
        my.total_score = DEFAULT_SCORE_RATE + (cutline - my.ranking).to_i * DEFAULT_SCORE_RATE
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
        my.total_score = DEFAULT_SCORE_RATE - (my.ranking - cutline).to_i #check if it's int or string
        break if my.total_score == 0
        my.save 
    end

    return all_users.to_json
end

get '/get_my_partner' do
    # if session["user_id"].nil?
    #     redirect '/'
    # else
    user = User.find(session["user_id"])
    meeting = MeetingDetail.where("meeting_date > ?", Time.now().to_datetime)
                            .where("starting_date < ?", Time.now().to_datetime).take

    my = JoinedUser.where("user_id" => user.id)
                    .where("meeting_detail_id" => meeting.id).take

    all_users = meeting.joined_users
    male_users = all_users.where(:is_male => true).take
    female_users = all_users.where(:is_male => false).take

    male_users.order("total_score DESC").each_with_index do |xy, i| ###total score???
        xy.ranking = i + 1
        xy.save
    end

    female_users.order("total_score DESC").each_with_index do |xx, j|
        xx.ranking = j + 1
        xx.save
    end

    #if ########### have to edit about 'last' meeting, and run this 'if' meeting was finished only 
    if meeting.cutline >= my.ranking
        if my.is_male?
            my_partner = female_users.where("ranking" => my.ranking).take
        else
            my_partner = male_users.where("ranking" => my.ranking).take
        end
    else
        puts "sorry. you are loser!" #need to be edited
    end

    return my_partner.to_json
end
################################################################################



post '/signin_process' do
    user = User.where("email" => params["email"]).first

    if !user.nil? and BCrypt::Password.new(user.password) == params["password"]
        session["user_id"] = user.id
        redirect '/main'
    else
        redirect back
    end
end

post '/signup_process' do
    if params["password"] != params["retype_password"]
        redirect back
    else
        user = User.new
        user.nickname = params["nickname"]
        user.email = params["email"]
        user.password = BCrypt::Password.create(params["password"])
        user.phone_number = params["phone_number"]
        if params["gender"] == "F"
            user.is_male = false
        else
            user.is_male = true
        end

        user.profile_img = params["profile_img"]
        user.location = params["location"]
        user.team_detail = params["team_detail"]
        user.recommendation_code = params["recommendation_code"]
        user.save

        session["user_id"] = user.id
        redirect '/'
    end 
end


# get '/sign_up' do
#     erb :sign_up
# end

# get '/sign_out' do
#     session.clear
#     redirect '/'
# end

# get '/main' do
#     if session["user_id"].nil?
#         redirect '/'
#     else
#     @user = User.find(session["user_id"])
#      erb :main
#     end
# end

# get '/delete/:user_id' do 
#     user = User.find(session["user_id"])
#     user.delete
#     redirect '/'
# end

# get '/profile' do
#     if session["user_id"].nil?
#         redirect '/'
#     else
#         @user = User.find(session["user_id"])
#         erb :profile
#     end
# end
    
post '/edit_profile' do 
    user = User.find(session["user_id"])
    user.email = params["email"]
    user.password = params["password"] #need to logic for check password
    user.nickname = params["nickname"]
    user.location = params["location"]
    user.phone_number = params["phone_number"]
    user.team_detail = params["team_detail"]
    # user.team_datail = params["team_detail"] #need to edit
    user.save #need company.save?

    redirect '/profile'
  end  

# get '/buy_heart' do
#     if session["user_id"].nil?
#         redirect '/'
#     else
#         @user = User.find(session["user_id"])
#         erb :buy_heart
#     end
# end

# get '/chats' do
#     if session["user_id"].nil?
#         redirect '/'
#     else
#         @user = User.find(session["user_id"])
#         erb :chats
#     end
# end


# get '/cash_payment' do 
#     check session
#     user.cash_payments 
#     redirect '/'
# end

# get '/get_heart_payment' do 
#     check session
#     user.cash_payments
#     redirect '/'
# end

# post '/sign_up_process' do
#     if params["nickame"].nil?
#         redirect '/error1_1'

#     elsif params["password"].nil?
#         redirect '/error1_2'

#     elsif params["password_confirm"].nil?
#         redirect '/error1_3'
        
#     elsif params["email"].nil?
#         redirect '/error1_4' # Enter Email
#     end

#     if !User.where("name" => params["name"]).take.nil?
#         redirect '/error1_5' # Nickname is in use. Enter another nickname.
#     end

#     if !User.where("email" => params["email"]).take.nil?
#         redirect '/error1_6' # Email is in use. Enter another Email.
#     end

#     if Company.where("name" => params["company_name"]).take.nil?
#         redirect '/error1_7' # Invalid company name.
#     end

#     if params["name"].length < 2
#         redirect '/error1_8' # Nickname should be longer than 2 syllables
#     end

#     if params["password"].length < 6
#         redirect '/error1_9' # Password should be longer than 6 syllables
#     end

#     if params["password"] != params["password_confirm"]
#         redirect '/error1_10' # Check the Password
#     end

#     if params["phone_number"].length < 10
#         redirect '/error1_11' # Phone number should be longer than 10 numbers
#     end

#     if !params["email"].include? "@" 
#         redirect '/error1_12' # Check Email address
#     elsif !params["email"].include? "."
#         redirect '/error1_13' # Check Email address
#     end

#     user = User.new
#     user.company = Company.find(params["company_name"]) #right?
#     user.nickname = params["nickname"]
#     user.email = params["email"]
#     user.phone_number = params["phone_number"]
#     user.password = BCrypt::Password.create(params["password"])
#     user.current_heart = 0
#     user.location = params["location"]
#     user.team_detail = params["team_datail"]
#     user.profile_img = params["profile_img"]

#     while true
#         user.recommendation_code = SecureRandom.hex(8) # hex(8) -> right????? -> OK
#         break if User.where("recommendation_code" => user.recommendation_code).take.nil?
#     end

#     user.is_male = params["gender"]
#     user.save

#     redirect '/'
# end