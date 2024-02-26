
var nameThatColorNameList = [];
Object.keys(ntc.names).forEach(function (key) {
    //get the value of name
    var val = ntc.names[key][1];
    // console.log(val);
    //push the name string in the array
    nameThatColorNameList.push(val);
});

function onNameThatColorsAutoSuggestChange() {
    var userInput = $('#nameThatColorsAutoSuggest').val();

    var colorsToBeSelected = [];
    $('#nameThatColorsCompleteTBody').empty();
    if (userInput.length == 0) {
        //draw entire table        
        colorsToBeSelected = ntc.names;
    } else {
        for (value of ntc.names) {
            result = value[1].toLowerCase().indexOf(userInput);
            if (result !== -1) {
                colorsToBeSelected.push(value);
            }
        }
    }
    // console.log(colorsToBeSelected);
    nameThatColorCompleteAllColorTable(colorsToBeSelected);
}

function nameThatColorCompleteAllColorTable(colorsToBeSelected) {


    for (var i = 0; i < colorsToBeSelected.length; i++) {
        var color = colorsToBeSelected[i];
        // console.log(color);
        // var n_match = ntc.name(sliceDeltaE.color.hex);
        var copicAndOhuhuColor=nameThatColorNearestAlcoholMarkers[color[0]];
        // console.log("copicAndOhuhuColor ",copicAndOhuhuColor);
        var row = "<tr>";
        row += "<td style='background-color:" + rgb2hex(color[2], color[3], color[4]) + "; height:110px;width:198px;'> </td>";
        row+="<td>"+copicAndOhuhuColor.copic_code+"("+copicAndOhuhuColor.copic_color_name+")"+"</td>";
        row+="<td>"+copicAndOhuhuColor.ohuhu_code+"("+copicAndOhuhuColor.ohuhu_color_name+")"+"</td>";
        row += "<td>" + color[1] + "</td>"; //name that color
        row += "<td>" + color[2] + "," + color[3] + "," + color[4] + "</td>";  // RGB
        row += "<td>" + color[0] + "</td>"; // Hex
        row += "<td>" + color[5] + "," + color[6] + "," + color[7] + "</td>"; // HSL
        // row+="<td>"+sliceDeltaE.deltaE+"</td>";
        row += "<td>"+copicAndOhuhuColor.deltaE + "</td>";
        row += "</tr>";
        $('#nameThatColorsCompleteTBody').append(row);
    }
}


function getCopicAndOhuhuColor(nameThatColorHex){
    var copicAndOhuhuColor;
    for(eachColor in nameThatColorNearestAlcoholMarkers){
        console.log(eachColor);
    }
    return copicAndOhuhuColor;
}

/**
 * this is for dev purposes to calculate EDistance for Each Name that color with Each copic color
 */
function calculateEDistance() {
    var nearestCopicAndOhuhuArr = {};
    for (var i = 0; i < ntc.names.length; i++) {
        var value = ntc.names[i];
        console.log("Calculating EDistance for NMC color ",value[1]);
        var ntcRGB = [value[2], value[3], value[4]];

        var nearestDeltaE=Number.MAX_VALUE;
        var nearestObject;
        //comparison code, generating deltaEs
        for (let i = 0; i < copicAndOhuhuColors.length; i++) {
            let obj = copicAndOhuhuColors[i];

            rgb = obj.rgb.substring(4, obj.rgb.length - 1)
                .replace(/ /g, '')
                .split(',');

            // console.log(rgb);

            // console.log("deltaE "+deltaE(selectedColor, rgb));
            // var eachColor = {}
            // eachColor["color"] = obj;
            // eachColor["deltaE"] = deltaE(selectedColor, rgb);
            // deltaEs.push(eachColor);
            var currentDeltaE=deltaE(ntcRGB, rgb);
            if(currentDeltaE<nearestDeltaE){
                nearestDeltaE = currentDeltaE;
                nearestObject = obj;
            }
            
        }
        var nearestCopicAndOhuhuColor = {};
        nearestCopicAndOhuhuColor = JSON.parse(JSON.stringify(nearestObject));
        nearestCopicAndOhuhuColor["hex"] = value[0];
        nearestCopicAndOhuhuColor["deltaE"] = nearestDeltaE;
        // console.log("hex ",value[0]," deltaE ",nearestDeltaE);
        // console.log("nearestCopicAndOhuhuColor ",JSON.stringify(nearestCopicAndOhuhuColor));
        
        // nearestCopicAndOhuhuArr.push(nearestCopicAndOhuhuColor);        

        var hexValue=value[0]+"";
        nearestCopicAndOhuhuArr[hexValue]=nearestCopicAndOhuhuColor;

        // var hexAndColorObject={};
        // hexAndColorObject[value[0]] = nearestCopicAndOhuhuColor;
        // nearestCopicAndOhuhuArr.push(hexAndColorObject);
        // var hexValue=value[0]+"";
        // nearestCopicAndOhuhuArr[hexValue] = nearestCopicAndOhuhuColor;
    }
    console.log("nearestCopicAndOhuhuArr ",nearestCopicAndOhuhuArr);
}