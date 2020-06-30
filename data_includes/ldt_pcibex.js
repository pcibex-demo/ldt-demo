PennController.ResetPrefix(null); // Initiates PennController

// Start typing your code here

Sequence("intro", "preload", shuffle("target", "filler"), "send", "final" )

newTrial( "intro" ,
    defaultText
        .print()
    ,
    newText("<p>In this experiment, you will have to report which of two pictures matches a description.</p>")
    ,
    newText("<p>Press the <strong>F</strong> key for the picture on the left, or the <strong>J</strong> key for the picture on the right.</p>")
    ,
    newText("<p>Please enter your ID and then click the button below to start the experiment.</p>")
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

CheckPreloaded("target", "filler")
    .label( "preload" );

newTrial( "welcome" ,
    newText( "message" , "Welcome. The resources are currently being preloaded. The next trial won't start before all the resources for the 'practice' trial are loaded (i.e. 1fishSquareTank.png).")
        .print()
    ,
    newButton("start", "Start")
        .print()
        .wait()
);

Template("target.csv", variable =>
  newTrial( "target" ,
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
  .log( "Group"  , variable.Group  )
)

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
