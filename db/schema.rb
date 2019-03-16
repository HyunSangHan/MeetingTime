# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_01_16_105522) do

  create_table "cash_payments", force: :cascade do |t|
    t.integer "user_id"
    t.integer "cash_paid"
    t.integer "heart_gotten"
    t.string "device_platform"
    t.string "iap_token"
    t.datetime "updated_at"
  end

  create_table "companies", force: :cascade do |t|
    t.string "name"
    t.string "domain"
  end

  create_table "heart_payments", force: :cascade do |t|
    t.integer "user_id"
    t.integer "heart_paid"
    t.datetime "updated_at"
  end

  create_table "joined_users", force: :cascade do |t|
    t.integer "user_id"
    t.integer "meeting_detail_id"
    t.integer "total_score"
    t.integer "ranking"
    t.integer "midranking"
    t.boolean "is_male"
    t.boolean "is_deleted"
    t.datetime "created_at"
  end

  create_table "matched_histories", force: :cascade do |t|
    t.integer "user_female_id"
    t.integer "user_male_id"
    t.integer "meeting_detail_id"
  end

  create_table "meeting_details", force: :cascade do |t|
    t.datetime "starting_date"
    t.datetime "mid_date"
    t.datetime "meeting_date"
    t.string "location"
    t.integer "cutline"
  end

  create_table "users", force: :cascade do |t|
    t.integer "company_id"
    t.integer "current_heart"
    t.string "nickname"
    t.string "password"
    t.string "email"
    t.string "phone_number"
    t.string "location"
    t.string "profile_img"
    t.string "recommendation_code"
    t.text "team_detail"
    t.boolean "is_male"
    t.datetime "created_at"
  end

end