let detectionCount = 0;

AFRAME.registerComponent('registerevents', {
    init: function () {
        var marker = this.el;

        // マーカーを検出したイベントの登録
        marker.addEventListener('markerFound', function () {
            var markerId = marker.id;
            // console.log('markerFound', markerId);

            // document.querySelector('#box').emit('markerfound');
            detectionCount ++;
            console.log(detectionCount);

            $('.modal').modal('show');
        });

        // マーカーを見失ったイベントの登録
        marker.addEventListener('markerLost', function () {
            var markerId = marker.id;
            // console.log('markerLost', markerId);

            // document.querySelector('#box').emit('markerlost');

            $('.modal').modal('hide');
        });
    }
});