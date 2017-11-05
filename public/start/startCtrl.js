'use strict';

angular.module('myApp.start', ['ngRoute'])

    .controller('StartCtrl', function ($scope, $rootScope, $location, Socket) {

        var socket = io.connect(Socket);
        $scope.start = function () {
            var blueRect = document.getElementById("blueRect");
            socket.on('first', function (obj) {
                blueRect.style.marginLeft = obj.left;
                blueRect.style.marginTop = obj.top;
            });
        }();
        socket.on('update', function (obj) {
            var blueRect = document.getElementById("blueRect");
            blueRect.style.marginLeft = obj.data.left;
            blueRect.style.marginTop = obj.data.top;
        });

        function moveRect(e) {

            var blueRect = document.getElementById("blueRect");
            // получаем стиль для blueRect
            var cs = window.getComputedStyle(blueRect);

            var left = parseInt(cs.marginLeft);
            var top = parseInt(cs.marginTop);
            socket.on('update', function (obj) {
                blueRect.style.marginLeft = obj.data.left;
                blueRect.style.marginTop = obj.data.top;
            });

            switch (e.keyCode) {

                case 37:  // если нажата клавиша влево
                    if (left > 0)
                        var left_server = left - 10 + "px";
                    var update = {
                        type: "left",
                        position: left_server
                    };
                    socket.emit('client_update', update);
                    break;
                case 38:   // если нажата клавиша вверх
                    if (top > 0)
                        var top_server = top - 10 + "px";
                    var update = {
                        type: "top",
                        position: top_server
                    };
                    socket.emit('client_update', update);
                    break;
                case 39:   // если нажата клавиша вправо
                    if (left < document.documentElement.clientWidth - 100)
                        var right_server = left + 10 + "px";
                    var update = {
                        type: "right",
                        position: right_server
                    };
                    socket.emit('client_update', update);
                    break;
                case 40:   // если нажата клавиша вниз
                    if (top < document.documentElement.clientHeight - 100)
                        var down_server = top + 10 + "px";
                    var update = {
                        type: "down",
                        position: down_server
                    };
                    socket.emit('client_update', update);
                    break;
            }
        }

        function moveRectButton(comand) {

            var blueRect = document.getElementById("blueRect");
            // получаем стиль для blueRect
            var cs = window.getComputedStyle(blueRect);

            var left = parseInt(cs.marginLeft);
            var top = parseInt(cs.marginTop);
            socket.on('update', function (obj) {
                blueRect.style.marginLeft = obj.data.left;
                blueRect.style.marginTop = obj.data.top;
            });

            switch (comand) {

                case "left":  // если нажата клавиша влево
                    if (left > 0)
                        var left_server = left - 10 + "px";
                    var update = {
                        type: "left",
                        position: left_server
                    };
                    socket.emit('client_update', update);
                    break;
                case "top":   // если нажата клавиша вверх
                    if (top > 0)
                        var top_server = top - 10 + "px";
                    var update = {
                        type: "top",
                        position: top_server
                    };
                    socket.emit('client_update', update);
                    break;
                case "right":   // если нажата клавиша вправо
                    if (left < document.documentElement.clientWidth - 100)
                        var right_server = left + 10 + "px";
                    var update = {
                        type: "right",
                        position: right_server
                    };
                    socket.emit('client_update', update);
                    break;
                case "down":   // если нажата клавиша вниз
                    if (top < document.documentElement.clientHeight - 100)
                        var down_server = top + 10 + "px";
                    var update = {
                        type: "down",
                        position: down_server
                    }
                    socket.emit('client_update', update);
                    break;
            }
        }

        addEventListener("keydown", moveRect);

        $scope.left = function () {
            moveRectButton('left');
        };
        $scope.right = function () {
            moveRectButton('right');
        };
        $scope.top = function () {
            moveRectButton('top');
        };
        $scope.down = function () {
            moveRectButton('down');
        };
    });