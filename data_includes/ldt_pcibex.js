DebugOff()

PennController.ResetPrefix(null); // Initiates PennController

// Start typing your code here

Sequence("intro", "preload", shuffle("target", "filler"), "send", "final" )

newTrial( "intro" ,
    defaultText
        .print()
    ,
    newText("<p>この実験では，画像の後に呈示される単語が実際にある単語かどうかをできるだけ早く判断していただきます。</p>")
    ,
    newText("<p>実際にある単語だと思ったら"F"のキーを，実際にはない単語だと思ったら"J"のキーを押してください。</p>")
    ,
    newText("<p>IDを入力してから，下にあるstartボタンを押してください，</p>")
    ,
    newTextInput("inputID")
        .print()
    ,
    newButton("Start")
        .print()
        .wait()
    ,
    newVar("ID")
        .global()
        .set( getTextInput("inputID") )
)
.log( "ID" , getVar("ID") )

// トライアルが始まる前に画像などの実験材料をロード
CheckPreloaded("target", "filler")
    .label( "preload" );

// newTrial( "welcome" ,
//     newText( "message" , "Welcome. The resources are currently being preloaded. The next trial won't start before all the resources for the 'practice' trial are loaded (i.e. 1fishSquareTank.png).")
//         .print()
//     ,
//     newButton("start", "Start")
//         .print()
//         .wait()
// );

// ターゲット用のテンプレート
Template("target.csv", variable =>
  newTrial( "target" ,
    newTimer(1000) // いきなり次の画像が呈示されないように1秒間の空白を作っています。
        .start()
        .wait()
    ,
    newImage("picture", variable.Picture)
        .print()
    ,
    newTimer(500) // 画像の呈示時間を設定しています。ここでは0.5秒間です。
        .start()
        .wait()
    ,
    getImage("picture")
        .remove() // このコマンドで画像を取り除かないと，ずっと画像が呈示されてしまう。
    ,
    newText("word", variable.Word)
        .settings.css("font-size", "50px") // フォントサイズを設定しています。
        .bold()
    ,
    newText("left", "Yes") // 語彙判断用の選択肢です。
        .settings.css("font-size", "30px")
    ,
    newText("right", "No") // 語彙判断用のもう一つの選択肢です。
        .settings.css("font-size", "30px")
    ,
    newCanvas(600,600)
        .add("center at 50%", "middle at 50%", getText("word") )
        .add("left at 25%", "bottom at 80%", getText("left"))
        .add("right at 75%", "bottom at 80%", getText("right"))
        .print()
        .log() // 単語が呈示されたタイミングを記録しています。
    ,
    newKey("FJ")
        .wait()
        .log() // どちらかの選択肢が選ばれたタイミングを記録しています。
    )
  .log( "ID"     , getVar("ID")    )
  .log( "Item"   , variable.Item   )
  .log( "Condition" , variable.Condition )
  .log( "Group"  , variable.Group  )
)

// ターゲットとフィラーを疑似ランダム化するために，フィラー用のテンプレートを別に作ります。
Template("fillers.csv", variable =>
  newTrial( "filler" ,
    newTimer(1000)
        .start()
        .wait()
    ,
    newImage("picture", variable.Picture)
        .print()
    ,
    newTimer(500)
        .start()
        .wait()
    ,
    getImage("picture")
        .remove()
    ,
    newText("word", variable.Word)
        .settings.css("font-size", "50px")
        .bold()
    ,
    newText("left", "Yes")
        .settings.css("font-size", "30px")
    ,
    newText("right", "No")
        .settings.css("font-size", "30px")
    ,
    newCanvas(600,600)
        .add("center at 50%", "middle at 50%", getText("word") )
        .add("left at 25%", "bottom at 80%", getText("left"))
        .add("right at 75%", "bottom at 80%", getText("right"))
        .print()
        .log()
    ,
    newKey("FJ")
        .wait()
        .log()
    )
  .log( "ID"     , getVar("ID")    )
  .log( "Item"   , variable.Item   )
  .log( "Condition" , variable.Condition )
)


// 結果の送信と最終画面
SendResults( "send" )

newTrial( "final" ,
    newText("<p>Thank you for your participation!</p>")
        .print()
    ,
    newText("<p><a href='https://www.pcibex.net/' href='_blank'>Click here to validate your participation.</a></p>")
        .print()
    ,
    newButton("void")
        .wait()
)
