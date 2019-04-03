//Clova Extensions Kit SDKモジュールを読み込む
const clova = require('@line/clova-cek-sdk-nodejs');
// Node.js のフレームワークexpressを読み込む
const express = require('express');
//ClientクラスのconfigureSkillメソッドでSkillConfiguratorクラスのインスタンスを生成
const clovaSkillHandler = clova.Client
    .configureSkill()

    //スキル起動時の処理
    .onLaunchRequest(responseHelper => {
        responseHelper.setSpeechList([
            {
              lang: 'ja',
              type: 'PlainText',
              value: '古時刻、今なんどきを、起動しました。'
            },
            {
              lang: 'ja',
              type: 'PlainText',
              value: '今なんどき、といってみてください。'
            }
        ]);
    })

    //ユーザーからの発話が来たら応答する処理
    .onIntentRequest(async responseHelper => {
        const intent = responseHelper.getIntentName();
        switch (intent) {
        //「いまなんどき？」の発話が来たら行う処理
        case 'WhatTimeIntent':
            timeslot = responseHelper.getSlot('WhatTimeSlot');
            if (timeslot != null) {
                //現在時刻より対応する古時刻を設定
                const date = new Date();
                const hour = date.getHours();
                const minute = date.getMinutes();
                let zodiac_name;
                let time_name;

                if (hour == 23 || hour == 0) {
                    zodiac_name = 'ね';
                } else if (hour == 1 || hour == 2) {
                    zodiac_name = 'うし';
                } else if (hour == 3 || hour == 4) {
                    zodiac_name = 'とら';
                } else if (hour == 5 || hour == 6) {
                    zodiac_name = 'う';
                } else if (hour == 7 || hour == 8) {
                    zodiac_name = 'たつ';
                } else if (hour == 9 || hour == 10) {
                    zodiac_name = 'み';
                } else if (hour == 11 || hour == 12) {
                    zodiac_name = 'うま';
                } else if (hour == 13 || hour == 14) {
                    zodiac_name = 'ひつじ';
                } else if (hour == 15 || hour == 16) {
                    zodiac_name = 'さる';
                } else if (hour == 17 || hour == 18) {
                    zodiac_name = 'とり';
                } else if (hour == 19 || hour == 20) {
                    zodiac_name = 'いぬ';
                } else if (hour == 21 || hour == 22) {
                    zodiac_name = 'い';
                }

                if ((hour % 2) != 0) {
                    if (minute < 30) {
                       time_name = '一つどき';
                    } else {
                       time_name = '二つどき';
                    }
                } else {
                    if (minute < 30) {
                      time_name = '三つどき';
                    } else {
                      time_name = '四つどき';
                    }
                }

        //取得した古時刻をユーザに返す
                responseHelper.setSimpleSpeech({
                    lang: 'ja',
                    type: 'PlainText',
                    value: zodiac_name + time_name
                });
            } else {
        //ユーザの言葉か聞き取れなかった場合
                responseHelper.setSimpleSpeech({
                    lang: 'ja',
                    type: 'PlainText',
                    value: 'よくわかりませんでした。再度、今なんどき、といってみてください。'
                });
            }
            break;
        default:
            responseHelper.setSimpleSpeech({
                lang: 'ja',
                type: 'PlainText',
                value: '今なんどき、といってみてください。'
            });
            break;
        }
    })

    //終了の処理
    .onSessionEndedRequest(responseHelper => {
    })
    .handle();

//ポート3000番で起動しリクエスト待受
const app = new express();
const port = process.env.PORT || 3000;

//applicationIdの検証、基本情報のExtension IDを入力
const clovaMiddleware = clova.Middleware({applicationId: 'YOUR_APPLICATION_ID'});

//ルートディレクトリ配下の本ディレクトリを指定
app.post('/time', clovaMiddleware, clovaSkillHandler);
app.listen(port, () => console.log(`Server running on ${port}`));
