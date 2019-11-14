import consoleColors from './consoleColors';  

export default function(method, endpoint){
    console.log( `${consoleColors.yellowColor}  ${consoleColors.brightColor}  ${consoleColors.hiddenColor}  ${consoleColors.greenColor}`,
        "Route",
        method,
        "===>",
        endpoint
    )
}