#require 'securerandom'
require 'bcrypt'
require './db_class.rb'

MeetingDetail.create( #1
    "starting_date"=>DateTime.new(2019,2,24,10),
    "mid_date"=>DateTime.new(2019,2,25,10),
    "meeting_date"=>DateTime.new(2019,3,25,22),
    "location"=>"Gangnam",
    "cutline"=>"0") #will be editted

MeetingDetail.create( #2
    "starting_date"=>DateTime.new(2019,3,24,10),
    "mid_date"=>DateTime.new(2019,3,25,10),
    "meeting_date"=>DateTime.new(2019,4,25,22),
    "location"=>"Hongdae",
    "cutline"=>"0") #will be editted

MeetingDetail.create( #3
    "starting_date"=>DateTime.new(2019,4,24,10),
    "mid_date"=>DateTime.new(2019,5,25,10),
    #결과발표 date 하나 더 만들어야할 수 있음
    "meeting_date"=>DateTime.new(2019,12,25,22),
    "location"=>"Gangnam",
    "cutline"=>"0") #will be editted


for i in 1..20 #for men
    j = i % 4 + 1

    Company.create(
        "name"=>"BRGG#{j}",
        "domain"=>"@#{j}mail.com")

    a = Company.find_by_id(i)

    User.create(
        "company_id" => a.id,
        "current_heart" => i,
        "nickname"=>"user#{i}",
        "email"=>"#{i}@#{i}mail.com",
        "password"=>BCrypt::Password.create("abc#{i}#{i}#{i}#{i}"),
        "phone_number"=>"#{i}#{i}#{i}-#{i}#{i}#{i}#{i}-#{i}#{i}#{i}#{i}",
        "location"=>"Gangnam",
        "profile_img"=>"/public/images/guest#{j}",
        "recommendation_code"=>"abcd#{i}#{i}",
        "team_detail"=>"Hi Nice to meet you",
        "is_male"=>true,
        "created_at"=>Time.now())

    b = User.find_by_id(i)

    JoinedUser.create(
        "user_id"=>b.id,
        "meeting_detail_id"=>1,
        "total_score"=>0,
        "ranking"=>i,
        "midranking"=>i,
        "is_male"=>b.is_male,
        "is_deleted"=>false,
        "created_at"=>Time.now())
end

for i in 21..30 #for women
    j = i % 4 + 1

    Company.create(
        "name"=>"BRGG#{j}",
        "domain"=>"@#{j}mail.com")

    a = Company.find_by_id(i)

    User.create(
        "company_id" => a.id,
        "current_heart" => i,
        "nickname"=>"user#{i}",
        "email"=>"#{i}@#{i}mail.com",
        "password"=>BCrypt::Password.create("abc#{i}#{i}#{i}#{i}"),
        "phone_number"=>"#{i}#{i}#{i}-#{i}#{i}ㄴ#{i}#{i}-#{i}#{i}#{i}#{i}",
        "location"=>"Gangnam",
        "profile_img"=>"/public/images/guest#{j}",
        "recommendation_code"=>"abcd#{i}#{i}",
        "team_detail"=>"Hi Nice to meet you",
        "is_male"=>false,
        "created_at"=>Time.now())

    b = User.find_by_id(i)

    JoinedUser.create(
        "user_id"=>b.id,
        "meeting_detail_id"=>1,
        "total_score"=>0,
        "ranking"=>i,
        "midranking"=>i,
        "is_male"=>b.is_male,
        "is_deleted"=>false,
        "created_at"=>Time.now())
end