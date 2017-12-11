var imagePart = (function () {
    return function (x, y, rows, columns, img, special) {
        var _x = x, _y = y;
        var _posX = x, _posY = y;
        var _offsetX, _offsetY;
        var _rows = rows, _columns = columns;
        var _special = special;
        var _img = img;


        this.changePosition = function (posX, posY) {
            _posX = posX;
            _posY = posY;
            this.refresh();
        }

        this.posX = function () { return _posX; }
        this.posY = function () { return _posY; }
        this.special = function () { return _special; }

        this.id = function () {
            return '#' + _posY + _posX;
        }

        this.onDatPlace = function () {
            return _posX == _x && _posY == _y;
        }

        this.refresh = function () {
            var ctx = $(this.id())[0].getContext('2d');
            _offsetX = -_x * (_img.width / _columns);
            _offsetY = -_y * (_img.height / _rows);
            if (!_special) {
                ctx.drawImage(_img, _offsetX, _offsetY);
                if (displayHelp) {
                    ctx.font = "12pt Arial";
                    ctx.fillStyle = "rgb(255,255,255)";
                    ctx.strokeStyle = "rgb(255,255,255)";
                    ctx.globalAlpha = 0.5;
                    ctx.strokeText("#" + _x + _y, 5, _img.height / _rows - 5);
                    ctx.globalAlpha = 1.0;
                }
            } else {
                ctx.fillStyle = '#000';
                ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            }
        }
    }
})();

var imageParts = [];
var clicks = 0;
var displayHelp = false;
var imagesArray = [];


var butWin = false;
var puzzleImage;
var imagesource;
var intervalArray = [];


function setImage(url, rows, columns) {
    var img = new Image;
    img.onload = function () {
        for (var i = 0; i < rows; ++i) {
            for (var j = 0; j < columns; ++j) {
                var ctx = $('#' + i + j)[0].getContext('2d');
                var imgPart;
                ctx.canvas.height = img.height / rows;
                ctx.canvas.width = img.width / columns;

                if (i == rows - 1 && j == columns - 1)
                    imgPart = new imagePart(j, i, rows, columns, img, true);
                else
                    imgPart = new imagePart(j, i, rows, columns, img, false);

                imgPart.refresh();
                imageParts.push(imgPart);
            }
        }
    };
    img.src = url;
}

function createTable(rows, columns) {
    $('#canvasTable').remove();
    var table = $('<table></table>')
        .attr({
            id: 'canvasTable',
            border: 0,
            cellspacing: 0,
            cellpadding: 0

        });
    for (var i = 0; i < rows; ++i) {
        var tr = $('<tr></tr>');
        for (var j = 0; j < columns; ++j) {
            var td = $('<td></td>')
                .append($('<canvas></canvas>')
                    .addClass('imagePart')
                    .attr({ id: '' + i + j }))
                .addClass('tableCell');
            $(tr).append(td);
        }
        $(table).append(tr);
    }
    $('#puzzle').append(table);
}

function getImgPart(x, y) {
    for (var i in imageParts) {
        if (imageParts[i].posX() == x && imageParts[i].posY() == y) {
            return imageParts[i];
        }
    }
}

function getImgPartById(id) {
    for (var i in imageParts) {
        if (imageParts[i].id() == '#' + id) {
            return imageParts[i];
        }
    }
}

function switchParts(x1, y1, x2, y2) {
    var imgPart1 = getImgPart(x1, y1);
    var imgPart2 = getImgPart(x2, y2);

    if (imgPart1 !== imgPart2) {
        imgPart1.changePosition(x2, y2);
        imgPart2.changePosition(x1, y1);
    }
}

function clickOn(id) {
    var imgPart = getImgPartById(id);
    var special;

    for (var i in imageParts) {
        if (imageParts[i].special())
            special = imageParts[i];
    }

    if (special === imgPart)
        return false;

    if (special.posX() == imgPart.posX() || special.posY() == imgPart.posY()) {
        var diffX = special.posX() - imgPart.posX();
        var diffY = special.posY() - imgPart.posY();
        var signX = diffX < 0 ? -1 : 1;
        var signY = diffY < 0 ? -1 : 1;

        for (var i = 0; i < Math.max(Math.abs(diffX), Math.abs(diffY)); ++i) {
            switchParts(special.posX(), special.posY(),
                diffX != 0 ? special.posX() - signX : special.posX(),
                diffY != 0 ? special.posY() - signY : special.posY());
        }
        return true;
    }
    return false;
}

function randomize(rows, columns, iteration) {
    i = 0;
    intervalArray.push( setInterval(function () {
        var rand1 = Math.floor(Math.random() * rows);
        var rand2 = Math.floor(Math.random() * columns);
        if (clickOn("" + rand1 + rand2)) i++;
        if (iteration <= i)
            intervalArray.forEach(function (interval, i, intervalArray) {
                clearInterval(interval);
            });

    }, 7))
}

function setClicks(clicks_) {
    clicks = clicks_;
    $('#clicks').text(clicks);
}

function load(rows, columns, url) {
    if (url == "" || rows == 0 || columns == 0)
        return;

    imageParts = [];
    createTable(rows, columns);
    setImage(url, rows, columns);

    $('.imagePart').click(function () {


        if (clickOn(this.id)) {
            setClicks(clicks + 1);
            if (checkWin(rows, columns)) {

                     showText();
                        setClicks(0);

                }
            }

    });
}

function checkWin(rows, columns) {
    var win = true;
    for (var obj in imageParts) {
        win &= imageParts[obj].onDatPlace();
    }
    return win;
}

function changeImage(image) {
    var rows = 4, columns = 4;


    $('div.banner').remove();
    $('span.windiv').remove();

    $('#canvasTable').css("display", "table");
    $(".text" + imagesource).css("display", "none");
    $('#puzzle').remove('margin');


    $('#maincontrol').css('text-align', 'center');
    $('#previews').css("display", "none");
    $('.maintext').css('display', 'block');
    $('.maintext1').css('display', 'none');
    $('#displayHelp').css('display', 'block');
    $('#displayHelp1').css('display', 'block');
    $('#randomize').css("display", "block");
    $('#win').css("display", "block");

    load(rows, columns, image);
    puzzleImage = image;
    setClicks(0);
    butWin = false;
    randomize(rows, columns, 100);


}

function showText() {
    var counter = 0;
    var _len=imagesArray.length;
    for (counter = 0; counter < _len; counter++) {



        if (checkImage(puzzleImage,imagesArray[counter])) {
          $('div.windiv').remove();
            $('.winAnswer').append('<span class="windiv"><img src="' + puzzleImage + '"/>');

            $(".text" + counter).css("display", "block");
            imagesource = counter;
            $('#puzzle').remove('margin');

            $('.maintext').css("margin-left", "5px");
            $('#canvasTable').css("display", "none");



            $('.maintext').css('display', 'none');
            $('.maintext1').css('display', 'none');
            $('#displayHelp').css('display', 'none');
            $('#displayHelp1').css('display', 'none');
            $('#randomize').css("display", "none");
            $('#win').css("display", "none");
			$('.windiv').show('slow');
            butWin = true;
        }
    }
}

$(document).ready(function () {

    var rows = 4, columns = 4;
    var _i, _len, image;
    /*imagesArray = ["file:///D:/Puzzle-4x4/GGPK/imagesPuzzles/bagach.jpg", 'file:///D:/Puzzle-4x4/GGPK/imagesPuzzles/applespas.jpg', 'file:///D:/Puzzle-4x4/GGPK/imagesPuzzles/dojinki.jpg', 'file:///D:/Puzzle-4x4/GGPK/imagesPuzzles/kupala.jpg', 'file:///D:/Puzzle-4x4/GGPK/imagesPuzzles/maslenitsa.jpg', 'file:///D:/Puzzle-4x4/GGPK/imagesPuzzles/pasha.jpg'];*/
    imagesArray = ["imagesPuzzles_rus/new_year.jpg", 'imagesPuzzles_rus/rojdestvo.jpg', 'imagesPuzzles_rus/verbnica.jpg', 'imagesPuzzles_rus/radonica.jpg', 'imagesPuzzles_rus/kolyda.jpg', 'imagesPuzzles_rus/troica.jpg'];
    imagesMinArray = ["imagesPuzzlesMin_rus/new_year.jpg", 'imagesPuzzlesMin_rus/rojdestvo.jpg', 'imagesPuzzlesMin_rus/verbnica.jpg', 'imagesPuzzlesMin_rus/radonica.jpg', 'imagesPuzzlesMin_rus/kolyda.jpg', 'imagesPuzzlesMin_rus/troica.jpg']; //миниатюры
    load(rows, columns, imagesArray[0]);
    puzzleImage = imagesArray[0];

    imagesource = 0;

    randomize(rows, columns, 100);


    for (_i = 0, _len = imagesMinArray.length; _i < _len; _i++) {
        image = imagesMinArray[_i];
        $('#previews').append('<img src="' + image + '" class="mini border border-primary" />');
    }

    Firstload();

     $('.mini').bind('click', function (event) {


       var counter = 0;
       var _len=imagesArray.length;
       for (counter = 0; counter < _len; counter++) {
       if (checkImage(event.target.src,imagesArray[counter]))
        changeImage(imagesArray[counter]);
                  }
    });

    $('#displayHelp').change(function () {
        displayHelp = !displayHelp;
        for (var i in imageParts) {
            imageParts[i].refresh();
        }

        if (displayHelp) {
            $('#canvasTable').css("display", "none");

            $('.answer').append('<div class="windiv"><img src="' + puzzleImage + '"></div>');
            //$('.windiv').css('margin', '41.2%');

        }
        else
        {
            $('#canvasTable').css("display", "table");
            $('div.windiv').remove();
          //  $('.windiv').css('margin', '0');
        }

    });

    $('#randomize').click(function () {
        setClicks(0);
        randomize(rows, columns, 100);
    });

    $('#win').click(function () {
        if (!butWin)
        showText();
    });

    $('#change').click(function () {
        $('div.banner').remove();
        $('span.windiv').remove();
        $('div.windiv').remove();
        $('#canvasTable').css("display", "none");
        $(".text" + imagesource).css("display", "none");
        $('.maintext').css('display', 'none');
        $('.maintext1').css('display', 'block');
        $('#previews').css("display", "block");
        $('#displayHelp').css('display', 'none');
        $('#displayHelp1').css('display', 'none');
        $('#randomize').css("display", "none");
        $('#win').css("display", "none");

    });


});

Firstload = function () {
    $('div.banner').remove();
    $('span.windiv').remove();
    $('#canvasTable').css("display", "none");
    $(".text" + imagesource).css("display", "none");
    $('#previews').css("display", "block");
    $('.maintext').css('display', 'none');
    $('#displayHelp').css('display', 'none');
    $('#displayHelp1').css('display', 'none');
    $('#randomize').css("display", "none");
    $('#win').css("display", "none");

}

function checkImage(img1,img2) {

 var pathImg1=img1.substring(img1.lastIndexOf("/"));
 var pathImg2=img2.substring(img2.lastIndexOf("/"));

 if (pathImg1===pathImg2){
 return true;
  }
 else {
   return false;
  }
}
