require 'sinatra'
require 'bcrypt'
require './db_class.rb'
require './function.rb'
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

get '/' do 
    if !session["user_id"].nil?
        redirect '/main'
    else
        erb :initpage
    end
end

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

get '/sign_up' do
    erb :sign_up
end

get '/sign_out' do
    session.clear
    redirect '/'
end

get '/main' do
    if session["user_id"].nil?
        redirect '/'
    else
    @user = User.find(session["user_id"])
     erb :main
    end
end    ##################### need to add get_ranking_result function with "if" about DateTime
  
get '/matching_result' do
    # if session["user_id"].nil?
    #     redirect '/'
    # else
    @user = User.find(session["user_id"])
    meeting = get_meeting_info

    my = JoinedUser.where("user_id" => user.id)
                    .where("meeting_detail_id" => meeting.id).take

    all_users = meeting.joined_users
    male_users = all_users.where(:is_male => true).take
    female_users = all_users.where(:is_male => false).take

    make_ranking_result

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

    erb :matching_result #need to add my_partner
    # end
end

get '/delete/:user_id' do 
    user = User.find(session["user_id"])
    user.delete
    redirect '/'
end

get '/profile' do
    if session["user_id"].nil?
        redirect '/'
    else
        @user = User.find(session["user_id"])
        erb :profile
    end
end
    
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

get '/buy_heart' do
    if session["user_id"].nil?
        redirect '/'
    else
        @user = User.find(session["user_id"])
        erb :buy_heart
    end
end

get '/chats' do
    if session["user_id"].nil?
        redirect '/'
    else
        @user = User.find(session["user_id"])
        erb :chats
    end
end


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



# get '/get_matching_result' do
#     check session

# end

# get '/get_my_info' do
#     check session
# end

# post '/edit_my_info_process' do
#     check session

#     if params["password"].nil?
#         redirect '/error1_2' # Enter Password

#     elsif params["password_confirm"].nil?
#         redirect '/error1_3' # Enter Password_confirm

#     if params["password"].length < 6
#         redirect '/error1_9' # Password should be longer than 6 syllables
#     end

#     if params["password"] != params["password_confirm"]
#         redirect '/error1_10' # Check the Password

#     elsif
#         user.company = Company.find(params["company_name"]) #right?
#         user.nickname = params["nickname"]
#         user.email = params["email"]
#         user.phone_number = params["phone_number"]
#         user.password = BCrypt::Password.create(params["password"])
#         user.location = params["location"]
#         user.team_detail = params["team_datail"]
#         user.profile_img = params["profile_img"]
#         user.save

#         redirect '/'
#     end
# end
    
# post '/invite' do
#     check_session

# end