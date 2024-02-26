function nameThatColorValueChanged(nameThatColorSelected){
    var color=ntc.names[nameThatColorSelected.value];
	$("#selectedNameThatColorBox").css("background-color", rgb2hex(color[2], color[3], color[4]));

    var color1 = [color[2], color[3], color[4]];
    $('#nameThatColorsTBody').empty();
    generateNameThatColorTable(color1);
}




function nameThatColorMatchingCountChanged() {
    // var index = $('#nameThatColorList').filter(":selected").val();
    var index= $('#nameThatColorList option:selected').val();

    // console.log("index ",index);
    var color=ntc.names[index];

    // console.log("color ",color);
    $('#nameThatColorsTBody').empty();

    $("#selectedNameThatColorBox").css("background-color", rgb2hex(color[2], color[3], color[4]));
    var color1 = [color[2], color[3], color[4]];
    generateNameThatColorTable(color1);
}



function generateNameThatColorTable(selectedColor){
			
    var deltaEs =[];

    //comparison code, generating deltaEs
    for(let i = 0; i < copicAndOhuhuColors.length; i++) {
        let obj = copicAndOhuhuColors[i];

        rgb = obj.rgb.substring(4, obj.rgb.length-1)
                 .replace(/ /g, '')
                 .split(',');

        var eachColor={}
        eachColor["color"] = obj;
        eachColor["deltaE"] = deltaE(selectedColor, rgb);
        deltaEs.push(eachColor);
    }

    //sorting & slicing part
    deltaEs.sort(function(a, b){return a.deltaE - b.deltaE});
    var maxmatchingNumber = $("#maxNumberOfMatchingColorsNameThatColor").val();
    var slicedDeltaEs = deltaEs.slice(0, maxmatchingNumber);
    

    //generating table based on sliced data
    for(var i = 0; i < slicedDeltaEs.length; i++) {
        var sliceDeltaE = slicedDeltaEs[i];

        rgb = sliceDeltaE.color.rgb.substring(4, sliceDeltaE.color.rgb.length-1)
                 .replace(/ /g, '')
                 .split(',');

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
        $('#nameThatColorsTBody').append(row);
    }
}