function valueChanged() {
    var red = $("#redInputValue").val();
    var green = $("#greenInputValue").val();
    var blue = $("#blueInputValue").val();
    // console.log(red, green, blue);
    var rgb = "" + red + green + blue;
    // console.log(rgb);
    $("#selectedColorBox").css("background-color", rgb2hex($("#redInputValue").val(), $("#greenInputValue").val(), $("#blueInputValue").val()));


    $('#matchingColorsTBody').empty();


    var color1 = [red, green, blue];
    compareColorsAndGenerateTable(color1);
}

function compareColorsAndGenerateTable(selectedColor){
			
    var deltaEs =[];

    //comparison code, generating deltaEs
    for(let i = 0; i < copicAndOhuhuColors.length; i++) {
        let obj = copicAndOhuhuColors[i];

        rgb = obj.rgb.substring(4, obj.rgb.length-1)
                 .replace(/ /g, '')
                 .split(',');

        // console.log(rgb);

        // console.log("deltaE "+deltaE(selectedColor, rgb));
        var eachColor={}
        eachColor["color"] = obj;
        eachColor["deltaE"] = deltaE(selectedColor, rgb);
        deltaEs.push(eachColor);
    }

    //sorting and slicing code
    // console.log("Before sort ",deltaEs);    
    deltaEs.sort(function(a, b){return a.deltaE - b.deltaE});
    // console.log("After sort ",deltaEs);
    var maxmatchingNumber = $("#maxNumberOfMatchingColors").val();
    var slicedDeltaEs = deltaEs.slice(0, maxmatchingNumber);
    // console.log("slicedDeltaEs ",slicedDeltaEs);


    //generating table
    for(var i = 0; i < slicedDeltaEs.length; i++) {
        var sliceDeltaE = slicedDeltaEs[i];
        // console.log(sliceDeltaE);
        // var ohuhuColorCode = sliceDeltaE.
        rgb = sliceDeltaE.color.rgb.substring(4, sliceDeltaE.color.rgb.length-1)
                 .replace(/ /g, '')
                 .split(',');
        // console.log("isnide td loop ", rgb);

        var n_match = ntc.name(sliceDeltaE.color.hex);
        var row="<tr><td><img src='./images/"+sliceDeltaE.color.file_name+"'/> </td>";
        row+="<td style='background-color:"+rgb2hex(rgb[0], rgb[1], rgb[2])+"'> </td>";
        row+="<td>"+sliceDeltaE.color.copic_code+"("+sliceDeltaE.color.copic_color_name+")"+"</td>";
        row+="<td>"+sliceDeltaE.color.ohuhu_code+"("+sliceDeltaE.color.ohuhu_color_name+")"+"</td>";
        row+="<td>"+n_match[1]+"</td>";
        row+="<td>"+sliceDeltaE.color.rgb+"</td>";
        row+="<td>"+sliceDeltaE.color.hex+"</td>";
        row+="<td>"+sliceDeltaE.color.hsl+"</td>";
        row+="<td>"+sliceDeltaE.deltaE+"</td>";
        row+="</tr>";
        $('#matchingColorsTBody').append(row);
    }
}

