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
|name|string|null: false,unique :true,index :true|

class User < ActiveRecored: :Base
  has_many:messages
  has_many:group_users
  has_many: group, through: :group_users
end

add_index :messages,[:name]


##messagesテーブル
|Column|Type|Options|
|———|———-|———|
|body|text||
|image|string|           |
|group_id|references|foreign_key: true|
|user_id|references|foreign_key: ture|

class Message < ActiveRecord: :Base
  belong_to :user
  belong_to :group
end




##groupsテーブル
|Column|Type|Options|
|———|———-|———|
|name|string|null: false|

class Group < ActiveRecord: :base
  has_many :messages
  has_meny :group_users
  has_many :user,through: :groups_user
end


##group_usersテーブル（中間テーブル）
|Column|Type|Options|
|———|———-|———|
|group_id|references |:group,foreign_key: true  |
|user_id|references |:user,foreign_key: true |

class Group_users < ActiveRecord: :base
  belong_to :user
  belong_to :group


