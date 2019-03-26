古時刻スキル(LineClova用サーバExtension)
====

## 本リポジトリについて
本リポジトリは、ascii.jp の連載記事「clovaスキル開発― 第1回」で紹介された記事に対応したソースコードとなります。
ソースコードの注目点につきましては、ascii.jp様の記事にて紹介しておりますので、以下のリンクよりご確認ください。

https://ascii.jp/

なお、本プログラムはLine Clova用スキルのExtensionプログラムのサンプルでnode.js言語で記述しています。

本プログラムを実行するには、node.js(express)が実行できるWEBサーバが必要で
Clova Developper CenterからアクセスできるようURLが公開されている必要があります。

Clova Developper Centerについて詳しくはこちらをご参照ください
https://clova-developers.line.biz/

## 実行環境、制限事項
・WEBサーバ（AWS EC2）
・node.js　v10.15.3
・npm 6.4.1
・Clova Extensions Kitソフトウェア開発キット（for Node.js ）

## Install　（AWS EC2の場合）
#### リポジトリの取得
`$ sudo curl -sL https://rpm.nodesource.com/setup_10.x | bash -`

#### nodejsのインストール

`$ sudo yum install -y nodejs`

#### 本プログラム用ディレクトリ作成
`$ mkdir time`

#### ディレクトリ移動
`$ cd time`

#### 本プログラムをGIT Clone
`$ git init`

`$ git clone git@github.com:asciiclova/time.git`

## Usage

ターミナルで、本ディレクトリtimeに入り、下記コマンドで実行

`$ node app.js`

Clova Developper Centerでスキルを作成して動作テストを行うことができます。
テスト画面から、「いまなんどきだい」と入力すると、結果のjsonがが返答されることを確認できます。

【サービスリクエスト】

`{
    "version": "1.0",
    "session": {
        "sessionId": "c1f3fb22-c483-4120-9fcc-3e82b0597848",
        "sessionAttributes": {},
        "user": {
            "userId": "kccdM54MSxmSWo6RoZV51w",
            "accessToken": "0f876ca4-0525-4fb1-b9b7-73af46b5399c"
        },
        "new": true
    },
    "context": {
        "System": {
            "application": {
                "applicationId": "jp.ascii.time"
            },
            "user": {
                "userId": "kccdM54MSxmSWo6RoZV51w",
                "accessToken": "0f876ca4-0525-4fb1-b9b7-73af46b5399c"
            },
            "device": {
                "deviceId": "b5dc977e-0ebe-40f8-880c-4e7490fba24b",
                "display": {
                    "size": "l100",
                    "orientation": "landscape",
                    "dpi": 96,
                    "contentLayer": {
                        "width": 640,
                        "height": 360
                    }
                }
            }
        }
    },
    "request": {
        "type": "IntentRequest",
        "intent": {
            "name": "WhatTimeIntent",
            "slots": {
                "WhatTimeSlot": {
                    "name": "WhatTimeSlot",
                    "value": "なんどきだい"
                }
            }
        }
    }
}`

【サービス応答JSON】
`{
    "response": {
        "card": {},
        "directives": [],
        "outputSpeech": {
            "type": "SimpleSpeech",
            "values": {
                "lang": "ja",
                "type": "PlainText",
                "value": "うま一つどき"
            }
        },
        "shouldEndSession": false
    },
    "sessionAttributes": {},
    "version": "1.0"
}`

## Licence

[MIT](https://github.com/ascii/tool/blob/master/LICENCE)

## Author

[ascii](https://github.com/asciiclova)
