require 'sinatra/activerecord'
#require 'bcrypt'

class Company < ActiveRecord::Base
	has_many :users
end

class CashPayment < ActiveRecord::Base
	belongs_to :user
end

class HeartPayment < ActiveRecord::Base
	belongs_to :user
end

class User < ActiveRecord::Base
    belongs_to :company
    has_many :cash_payments
    has_many :heart_payments
	has_many :joined_users
	has_many :matcehd_histories #need check
end

class JoinedUser < ActiveRecord::Base
	belongs_to :user
	belongs_to :meeting_detail
end

class MatchedHistory < ActiveRecord::Base
	belongs_to :user
end

class MeetingDetail < ActiveRecord::Base
	has_many :joined_users
end