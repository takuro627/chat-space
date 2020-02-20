# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

* Database design 

# users テーブル
|Column|Type|Options|
|------|----|-------|
|user_name|string|null: false|
|mail_address|string|null: false|
|pass_word|string|null: false|

## Association
- has_many :user_ids, through: :groups_users
- has_many :groups
- has_many :messages

# groups テーブル
|Column|Type|Options|
|------|----|-------|
|group_name|string|null: false|

## Association
- has_many :group_ids
- has_many :users, through: :groups_users

# groups_users テーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null:false, foreign_key: true|
|group_id|integer|null:false, foreign_key: true|

## Association
- belongs_to :user
- belongs_to :group

# messages テーブル
|Column|Type|Options|
|------|----|-------|
|body|text||
|image|string||
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

## Association
- belongs_to :user
- belongs_to :group
