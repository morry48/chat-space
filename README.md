#Chatspace database設計

*メッセージ管理機能
*ユーザー管理機能
*グループ管理機能
*グループ・ユーザー管理機能


##アソシエーションについて
usersテーブルとmessagesテーブル、groupsテーブルがどちらも一対多となるアソシエーションを設定する。
usersテーブルとgroupsテーブルはお互いに多対多となるため中間テーブルのgroup-usersテーブルを作成し、アソシエーションを設定する。


##usersテーブル
|Column|Type|Options|
|———|———-|———|
|email|text|null: false, unique: true|
|password|text|null: false|
|name|string|null: false|

class User < ActiveRecored: :Base
  has_many:messages
  has_many:groups_users
  has_many: group, through: :groups_users
end

add_index :messages,[:name]


##messagesテーブル
|Column|Type|Options|
|———|———-|———|
|id|integer|null: false|
|body|text|null: false|
|image|string|           |
|group_id|references|foreign_key: true|
|user_id|references|foreign_key: ture|

class Message < ActiveRecord: :Base
  belong_to :user
  belong_to :group
end

INDEX
  add_index :messages,[:group_id, :use_id]



##groupsテーブル
|Column|Type|Options|
|———|———-|———|
|group_name|text|null: false|

class Group < ActiveRecord: :base
  has_many :messages
  has_many :user,through: :groups_user
end


##group_usersテーブル（中間テーブル）
|Column|Type|Options|
|———|———-|———|
|group_id|references |:group,foreign_key: true  |
|user_id|references |:user,foreign_key: true |


