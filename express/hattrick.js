/**
 * class wrapper for Hattrick.js containing all of its methods 
 */
class Hattrick {
    constructor() {
        // Empty constructor
    }

    /**
     * Generates a player object which contains basic information and stats about that player
     * @param {*} pname - name of player
     * @param {*} img - image of player (perferred dim = nxn)
     * @param {*} tname - team name
     * @param {*} height - player height (in m)
     * @param {*} gpg - goals per game (GPG)
     * @param {*} apg - assists per game (APG)
     * @param {*} sog - shots on goal (SOG)
     * @param {*} xcoord - x-coordinate on canvas/pitch
     * @param {*} ycoord - y-coordinate on canvas/pitch
     * @returns a player JSON
     */

    generatePlayerStruct(pname, img, tname, height, gpg, apg, sog, xcoord, ycoord) {
        const player = {
            playerName: pname,
            playerImg: img, // accounts for variable img sizes (resize based on canvas)
            teamName: tname,
            height: height,
            stats: {
                gpg: gpg,
                apg: apg,
                sog: sog,
            },
            x: xcoord,
            y: ycoord,
        }
        return player
    }


    /**
     * Generates an array of player objects
     * @param {*} pnames - array of players names
     * @param {*} imgs - array of player images
     * @param {*} tname - team name
     * @param {*} heights - array of player heights
     * @param {*} gpgs - array of players' goals per game (GPG)
     * @param {*} apgs - array of players' assists per game (APG) 
     * @param {*} sogs - array of players' shots on goals (SOG)
     * @param {*} coords - array of coordinates representing player locations on the canvas in the format: ["x1,y1", "x2,y2", ...]
     * @returns an array of player objects
     */
    generatePlayerStructArray(pnames, imgs, tname, heights, gpgs, apgs, sogs, coords) {
        var players = [];
        pnames.forEach((elem, i) => {
            const coordArr = coords[i].split(','); // "x,y" -> [x,y]
            const player = this.generatePlayerStruct(elem, imgs[i], tname, heights[i], gpgs[i], apgs[i], sogs[i], coordArr[0], coordArr[1]);
            players.push(player);
        });
        return players;
    }


    /**
     * Sets up a canvas with custom basic specifications (i.e. a uniform background color, height, width)
     * @param {*} playName - name of the play to be drawn on the canvas
     * @param {*} backgroundColor - colour to fill the background of the canvas
     * @param {*} width - width of canvas
     * @param {*} height - height of canvas
     */
    newBlankPlayCanvas(playName, backgroundColor, width, height) {
        var canvWrapper = document.createElement("div");
        const playHead = document.createElement("h4");
        playHead.id = "playname";
        playHead.innerHTML = `${playName}`;
        canvWrapper.id = "playCanvContainer";
        var newCanv = document.createElement("canvas");
        newCanv.id = `${playName.replaceAll(' ', '')}`;
        newCanv.height = height;
        newCanv.width = width;
        var context = newCanv.getContext('2d');
        context.fillStyle = backgroundColor;
        context.fillRect(0, 0, newCanv.width, newCanv.height);

        canvWrapper.appendChild(playHead);
        canvWrapper.appendChild(newCanv);
        document.body.appendChild(canvWrapper);
    }


    /**
     * Sets up a canvas with a custom background along with the other standard specification such as height and width
     * @param {*} playName - name of the play to be drawn on the canvas
     * @param {*} backgroundImgLink - image to use for canvas backdrop
     * @param {*} width - width of canvas
     * @param {*} height - height of canvas
     */
    newCustomPlayCanvas(playName, backgroundImgLink, width, height) {
        var canvWrapper = document.createElement("div");
        const playHead = document.createElement("h4");
        playHead.id = "playname";
        playHead.innerHTML = `${playName}`;
        canvWrapper.id = "playCanvContainer";
        var newCanv = document.createElement("canvas");
        newCanv.id = `${playName.replaceAll(' ', '')}`;
        newCanv.height = height;
        newCanv.width = width;
        var context = newCanv.getContext('2d');
        var img = new Image();
        img.src = backgroundImgLink;
        img.onload = () => {
            context.drawImage(img, 0, 0, width, height);
        }
        canvWrapper.appendChild(playHead);
        canvWrapper.appendChild(newCanv);
        document.body.appendChild(canvWrapper);
    }


    /**
     * Helper function to render a player image on a specific coordinate on a canvas
     * @param {*} canvasId - the canvas id in the html body
     * @param {*} imgLink - link to image of a player (should ideally be square)
     * @param {*} x - x-coordinate on canvas
     * @param {*} y - y-coordinate on canvas
     */
    playerRenderHelper(canvasId, imgLink, x, y) {
        const canv = document.getElementById(canvasId);
        const context = canv.getContext('2d');
        const img = new Image;
        img.src = imgLink;
        const dim = Math.ceil(canv.height / 11);
        img.addEventListener("load", () => {
            // draw image at x, y, width and height 50,50
            context.drawImage(img, x, y, dim, dim);  // resizes image
        }, { once: true });
    }


    /**
     * Draws N players on a canvas that has a custom image background
     * @param {*} canvasId - the canvas id in the html body
     * @param {*} playersArray - an array of player objects
     */
    drawPlayersUsingObjects(canvasId, playersArray) {
        for (var i = 0; i < playersArray.length; i++) {
            this.playerRenderHelper(canvasId, playersArray[i].playerImg, playersArray[i].x, playersArray[i].y);
        }
    }


    // FUNCTION THAT IS SIMILAR TO drawPlayersUsingCoords BUT IT ONLY REQUIRES THE COORDS (JUST DRAW A RECTANGE TO REPRESENT PLAYERS)
    // FOR USE BY DEVELOPERS THAT DON'T WANT TO CREATE PLAYER OBJECTS
    /**
     * Draws N squares (representing players) on any canvas with id = canvasId using only an array of coordinates.
     * Used in situations where generating an array of player objects is not needed
     * @param {*} canvasId - the canvas id in the html body
     * @param {*} coordsArray - array of coordinates representing player locations on the canvas in the format: ["x1,y1", "x2,y2", ...]
     */
    drawPlayerUsingCoordsOnly(canvasId, coordsArray) {
        const canv = document.getElementById(canvasId);

        const context = canv.getContext('2d');
        const img = new Image;
        img.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/A_black_image.jpg/640px-A_black_image.jpg';
        img.addEventListener("load", () => {
            const goalHeight = Math.ceil(canv.height / 3);
            context.drawImage(img, 7, goalHeight, 2, goalHeight);
            const oppGoal = canv.width - 8;
            context.drawImage(img, oppGoal, goalHeight, 2, goalHeight);
            const dim = Math.ceil(canv.height / 22);
            for (var i = 0; i < coordsArray.length; i++) {
                var tmpCoordArr = coordsArray[i].split(',');
                const xcoord = tmpCoordArr[0];
                const ycoord = tmpCoordArr[1];
                context.drawImage(img, xcoord, ycoord, dim, dim);
                //context.rect(xcoord, ycoord, dim, dim);
            }
            context.clip();
            context.drawImage(img, 0, 0);
            context.restore();
        }, { once: true });
    }


    /**
     * Draws a pass between N players on a canvas with a non-custom background image. This function can be used with canvases created using
     * newBlankPlayCanvas
     * @param {*} canvasId - the canvas id in the html body
     * @param {*} passArray - array of coordinates representing player locations on the canvas in the format: ["x1,y1", "x2,y2", ...], with the elements being ordered in the order of the ball movement
     */
    drawNPlayerPassWithCoords(canvasId, passArray) {

        const canv = document.getElementById(canvasId);

        const context = canv.getContext('2d');
        const xy1 = passArray[0].split(',');

        context.lineWidth = 2;
        context.strokeStyle = 'red';
        context.beginPath();
        context.moveTo(xy1[0], xy1[1]);
        var xynOld = xy1;
        for (var i = 0; i < passArray.length; i++) {
            var xyn = passArray[i].split(',');
            context.moveTo(xynOld[0], xynOld[1]);
            xynOld = xyn;
            context.lineTo(xyn[0], xyn[1]);
        }
        context.stroke();
    }


    /**
     * Draws a pass between N players on a canvas with a custom background image.
     * Can pass in canvasId in place of playName here if the canvas exists already and you just want to draw a play on top of it.
     * If the user chooses to use the function in this way, the width, height, and backgroundImgLink must be the same as the old canvas.
     * Otherwise, a new play can also be generated by passing in a unique playName as the first parameter.
     * @param {*} playName - name of play
     * @param {*} backgroundImgLink - link to a background image to fill the canvas with
     * @param {*} width - width of canvas
     * @param {*} height - height of canvas
     * @param {*} passArray - array of coordinates representing player locations on the canvas in the format: ["x1,y1", "x2,y2", ...], with the elements being ordered in the order of the ball movement
     * @param {*} playersArray - array of player objects (must include players involved in the passing scheme)
     */
    drawNPlayerPassWithCoordsCustom(playName, backgroundImgLink, width, height, passArray, playersArray) {
        const oldid = `${playName.replaceAll(' ', '')}`;
        const oldCanv = document.getElementById(oldid);

        var newCanv = document.createElement("canvas");
        newCanv.id = `${playName.replaceAll(' ', '')}`;
        newCanv.height = height;
        newCanv.width = width;
        // oldCanv.parentNode.replaceChild(newCanv, oldCanv);
        var context = newCanv.getContext('2d');
        var img = new Image();
        img.src = backgroundImgLink;
        const xy1 = passArray[0].split(',');

        context.lineWidth = 2;
        context.strokeStyle = 'red';
        img.onload = () => {
            context.drawImage(img, 0, 0, width, height);
            context.beginPath();
            context.moveTo(xy1[0], xy1[1]); // initial line head coordinates
            for (var a = 1; a < passArray.length; a++) {
                const xy2 = passArray[a].split(',');
                context.lineTo(xy2[0], xy2[1]);
            }
            context.stroke();
        }
        if (oldCanv) {
            oldCanv.parentNode.replaceChild(newCanv, oldCanv);
        }
        else if (oldCanv == null) {
            var canvWrapper = document.createElement("div");
            const playHead = document.createElement("h4");
            playHead.id = "playname";
            playHead.innerHTML = `${playName}`;
            canvWrapper.id = "playCanvContainer";
            canvWrapper.appendChild(playHead);
            canvWrapper.appendChild(newCanv);
            document.body.appendChild(canvWrapper);
        }
        this.drawPlayersUsingObjects(oldid, playersArray);
    }


    /**
     * Draws a pass between N-named players in a predefined playerArray (need to pass array of all players).
     * This can be used by setting the passArray to [A,B,C,..] where A,B,C,.. are player names in playerArray
     * @param {*} canvasId - the canvas id in the html body
     * @param {*} isCustomCanvas - true if the canvas being drawn on has a custom image background
     * @param {*} backgroundImgLink - link to the custom background image if isCustomCanvas is true
     * @param {*} playerArray - array of player objects
     * @param {*} passArray - array of player names ordered by the order of the ball movement
     * @returns void
     */
    drawNPlayerPassWithNames(canvasId, isCustomCanvas, backgroundImgLink = null, playerArray, passArray) {
        // should make use of drawNPlayerPassWithCoordsCustom or drawNPlayerPassWithCoords here to simplify things
        const canv = document.getElementById(canvasId);

        const context = canv.getContext('2d');
        context.lineWidth = 2;

        var p1Found = false;
        var p1Ind;
        var p2Found = false;
        var p2Ind;
        for (var i = 0; i < playerArray.length; i++) {
            if (playerArray[i].playerName === passArray[0]) {
                p1Found = true;
                p1Ind = i;
                break;
            }
        }

        if (p1Found) {
            var passCoords = [];
            passCoords.push(`${playerArray[p1Ind].x},${playerArray[p1Ind].y}`);
            for (var k = 1; k < passArray.length; k++) {
                for (var j = 0; j < playerArray.length; j++) {
                    if (playerArray[j].playerName === passArray[k]) {
                        passCoords.push(`${playerArray[j].x},${playerArray[j].y}`);
                    }
                }
            }

            if (isCustomCanvas) {
                const canv = document.getElementById(canvasId);
                this.drawNPlayerPassWithCoordsCustom(canvasId, backgroundImgLink, canv.width, canv.height, passCoords, playerArray);
                return;
            }
            else {
                this.drawNPlayerPassWithCoords(canvasId, passCoords);
                return;
            }
        }
    }


    /**
     * Displays information about a specific play below an existing canvas in the document id
     * @param {*} canvasId - the canvas id in the html body
     * @param {*} playerArray - an array of player objects
     * @param {*} passArray - array of player names or coordinate strings ordered by the order of the ball movement
     */
    displayPlayInfoAndStats(canvasId, playerArray, passArray) {
        const canvas = document.getElementById(canvasId);

        var globalText = '';

        if (passArray.length == 2) {
            globalText = `${passArray[0]} passes to ${passArray[1]}`
        }
        else {
            for (var i = 0; i < passArray.length - 1; i++) {
                globalText += `${passArray[i]} passes to ${passArray[i + 1]}, `;
            }
            var newstr = globalText.slice(0, -2)
            globalText = newstr;
        }
        //console.log(globalText);
        const par = canvas.parentElement;
        //console.log(par);
        const passInfo = document.createElement("div");
        passInfo.id = "passInfoDiv";
        passInfo.innerHTML = `<b>Ball movement information: </b>${globalText}`;
        //console.log(passInfo);
        const tblHeader = document.createElement("h4");
        tblHeader.id = "playersInvolvedTableHeader";
        tblHeader.innerHTML = "Players Involved In Play"
        let table = document.createElement('table');
        table.id = "styled-table";
        let thead = document.createElement('thead');
        let tbody = document.createElement('tbody');

        let row1 = document.createElement('tr');
        let heading1 = document.createElement('th');
        heading1.innerHTML = "Player Name";
        let heading2 = document.createElement('th');
        heading2.innerHTML = "Image";
        let heading3 = document.createElement('th');
        heading3.innerHTML = "Team Name";
        let heading4 = document.createElement('th');
        heading4.innerHTML = "Height";
        let heading5 = document.createElement('th');
        heading5.innerHTML = "Goals Per Game (GPG)";
        let heading6 = document.createElement('th');
        heading6.innerHTML = "Assists Per Game (APG)";
        let heading7 = document.createElement('th');
        heading7.innerHTML = "Shots On Goal (SOG)";

        row1.appendChild(heading1);
        row1.appendChild(heading2);
        row1.appendChild(heading3);
        row1.appendChild(heading4);
        row1.appendChild(heading5);
        row1.appendChild(heading6);
        row1.appendChild(heading7);
        thead.appendChild(row1);

        for (var l = 0; l < passArray.length; l++) {
            for (var j = 0; j < playerArray.length; j++) {
                if (passArray[l] == playerArray[j].playerName) {
                    let rowN = document.createElement('tr');
                    let rowN_data_1 = document.createElement('td');
                    rowN_data_1.innerHTML = `${playerArray[j].playerName}`;
                    let rowN_data_2 = document.createElement('td');
                    rowN_data_2.innerHTML = `<img src=${playerArray[j].playerImg} width="90" height="90" alt='player'/>`;
                    let rowN_data_3 = document.createElement('td');
                    rowN_data_3.innerHTML = `${playerArray[j].teamName}`;
                    let rowN_data_4 = document.createElement('td');
                    rowN_data_4.innerHTML = `${playerArray[j].height}`;
                    let rowN_data_5 = document.createElement('td');
                    rowN_data_5.innerHTML = `${playerArray[j].stats.gpg}`;
                    let rowN_data_6 = document.createElement('td');
                    rowN_data_6.innerHTML = `${playerArray[j].stats.apg}`;
                    let rowN_data_7 = document.createElement('td');
                    rowN_data_7.innerHTML = `${playerArray[j].stats.sog}`;

                    rowN.appendChild(rowN_data_1);
                    rowN.appendChild(rowN_data_2);
                    rowN.appendChild(rowN_data_3);
                    rowN.appendChild(rowN_data_4);
                    rowN.appendChild(rowN_data_5);
                    rowN.appendChild(rowN_data_6);
                    rowN.appendChild(rowN_data_7);
                    tbody.appendChild(rowN);
                }
            }
        }

        table.appendChild(thead);
        table.appendChild(tbody);

        par.appendChild(passInfo);
        par.appendChild(tblHeader);
        par.appendChild(table);

    }


    /**
     * Generates a table containing the scouting report for a team
     * @param {*} playerArray - an array of player objects
     */
    generateTeamScoutingReport(playerArray) {
        const wrapper = document.createElement("div");
        wrapper.id = "scoutingReportWrapper";
        const tblHeader = document.createElement("h3");
        tblHeader.id = "scoutingReport";
        tblHeader.innerHTML = `Scouting Report for ${playerArray[0].teamName}`
        let table = document.createElement('table');
        table.id = "styled-table";
        let thead = document.createElement('thead');
        let tbody = document.createElement('tbody');

        let row1 = document.createElement('tr');
        let heading1 = document.createElement('th');
        heading1.innerHTML = "Player Name";
        let heading2 = document.createElement('th');
        heading2.innerHTML = "Image";
        let heading4 = document.createElement('th');
        heading4.innerHTML = "Height";
        let heading5 = document.createElement('th');
        heading5.innerHTML = "Goals Per Game (GPG)";
        let heading6 = document.createElement('th');
        heading6.innerHTML = "Assists Per Game (APG)";
        let heading7 = document.createElement('th');
        heading7.innerHTML = "Shots On Goal (SOG)";

        row1.appendChild(heading1);
        row1.appendChild(heading2);
        row1.appendChild(heading4);
        row1.appendChild(heading5);
        row1.appendChild(heading6);
        row1.appendChild(heading7);
        thead.appendChild(row1);


        for (var j = 0; j < playerArray.length; j++) {
            let rowN = document.createElement('tr');
            let rowN_data_1 = document.createElement('td');
            rowN_data_1.innerHTML = `${playerArray[j].playerName}`;
            let rowN_data_2 = document.createElement('td');
            rowN_data_2.innerHTML = `<img src=${playerArray[j].playerImg} width="100" height="100" alt='player'/>`;
            let rowN_data_4 = document.createElement('td');
            rowN_data_4.innerHTML = `${playerArray[j].height}`;
            let rowN_data_5 = document.createElement('td');
            rowN_data_5.innerHTML = `${playerArray[j].stats.gpg}`;
            let rowN_data_6 = document.createElement('td');
            rowN_data_6.innerHTML = `${playerArray[j].stats.apg}`;
            let rowN_data_7 = document.createElement('td');
            rowN_data_7.innerHTML = `${playerArray[j].stats.sog}`;

            rowN.appendChild(rowN_data_1);
            rowN.appendChild(rowN_data_2);
            rowN.appendChild(rowN_data_4);
            rowN.appendChild(rowN_data_5);
            rowN.appendChild(rowN_data_6);
            rowN.appendChild(rowN_data_7);
            tbody.appendChild(rowN);
        }

        table.appendChild(thead);
        table.appendChild(tbody);

        wrapper.appendChild(tblHeader);
        wrapper.appendChild(table);
        document.body.appendChild(wrapper);
    }

}
