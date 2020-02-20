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
|name|string|null: false|
|mail_address|string|null: false|
|pass_word|string|null: false|

## Association
- has_many :groups, through: :groups_users
- has_many :groups_users
- has_many :messages

# groups テーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|

## Association
- has_many :groups_users
- has_many :users, through: :groups_users
- has_meny :messages

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
