/**
 * Created by User on 16.05.2017.
 */

//Timer
var seconds = 0;

function timer() {
    var timer = document.getElementById('timer');
    var timerId = setInterval(function() {
        seconds +=1;
        if (seconds>60) {
            var h = seconds/3600 ^ 0 ;
            var m = (seconds-h*3600)/60 ^ 0 ;
            if (m<10) {
                m = '0' + m;
            }
            var s = seconds-h*3600-m*60 ;
            if (s<10) {
                s = '0' + s;
            }
        }
        else {
            var m = '00';
            var s = seconds ;
            if (s<10) {
                s = '0' + s;
            }
        }
        var timeCount = (m + ':' + s);
        timer.innerHTML = timeCount;
    }, 1000);
}


//rotation
var deg =0;

function rotate() {

    var pixels = document.getElementById('pixels');
    var style = window.getComputedStyle(pixels);
    var transform = style.getPropertyValue('transform');
    if (deg == 270) {
        deg = 0;
    }else {
        deg += 90;
    }
    pixels.style.webkitTransform = 'rotate('+deg+'deg)';
    pixels.style.mozTransform    = 'rotate('+deg+'deg)';
    pixels.style.msTransform     = 'rotate('+deg+'deg)';
    pixels.style.oTransform      = 'rotate('+deg+'deg)';
    pixels.style.transform       = 'rotate('+deg+'deg)';

    var attr = document.getElementById('rotate').setAttribute('deg', deg);
}

//click events

function clicks() {
        var pixels = document.querySelectorAll('.pixels-block');
        var allPixels = document.querySelectorAll('.pixels-block').length;
        var c = 0;
        do {
            var pixel = pixels[c];
            pixel.addEventListener('click', function () {
                if (this.classList.contains('black')) {
                    this.classList.remove('black');
                } else {
                    this.classList.add('black');
                }

            });
            c++;
        } while (c < allPixels);
}

//result and modal

function openModal() {
    var overlay = document.getElementById('overlay');
    overlay.style.opacity = '1';
    overlay.style.zIndex = '2';
}

function closeModal() {
    var overlay = document.getElementById('overlay');
    overlay.style.opacity = '0';
    overlay.style.zIndex = '-1';

    var canvas = document.getElementById('result');
    var ctx = canvas.getContext('2d');
}


function result() {
    //Ширина холста.
    var canvasWitdh = 404;
    //Высота и ширина пикселя
    var pixelHeight = 101;
    var pixelWidth = 101;


    var degs = document.getElementById('rotate').getAttribute('deg');

    openModal();
    //Количество закрашеных пикселей
    var allPixels = document.querySelectorAll('.black').length;
    document.getElementById('pixelsColored').innerHTML = allPixels;
    //Секунды
    var time = document.getElementById('timer').innerHTML;
    document.getElementById('timeSpended').innerHTML = time;

    var canvas = document.getElementById('result');
    var ctx = canvas.getContext('2d');

    //Сбрасываем прошлые повороты.
    ctx.setTransform(1, 0, 0, 1, 0, 0);

    //Вращение
    ctx.translate(canvasWitdh/2, canvasWitdh/2);
    ctx.rotate(degs*Math.PI/180);
    ctx.translate(-canvasWitdh/2, -canvasWitdh/2);

    //заливка
    ctx.fillStyle='#90C4B8';
    ctx.fillRect(0, 0, 404, 404);
    ctx.fillStyle='black';

    //Указатель на 0.
    var index = 0;

    //положение х, y
    var x = 0;
    var y = 0;

    //Отрисовываем пиксели
    do {
        var pixels = document.querySelectorAll('.pixels-block');
            if (pixels[index].classList.contains('black')) {
                ctx.fillRect(x, y, pixelWidth, pixelHeight);
                if (x == 303) {
                    x = 0;
                    y =y+pixelHeight;
                }
                else {
                    x = x+pixelWidth;
                }
            }
             else {
                if (x == 303) {
                    x = 0;
                    y = y+101;
                }
                else {
                    x = x+pixelWidth;
                }
            }
        index++;
    }while (index<17);

}




// }
