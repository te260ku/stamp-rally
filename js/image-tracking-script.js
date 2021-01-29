AFRAME.registerComponent('registerevents', {
    init: function () {
        var marker = this.el;

        // マーカーを検出したイベントの登録
        marker.addEventListener('markerFound', function () {
            var markerId = marker.id;
            console.log('markerFound', markerId);

            // アニメーションの開始
            // document.querySelector('#box').emit('markerfound');
            alert("detected!");
        });

        // マーカーを見失ったイベントの登録
        marker.addEventListener('markerLost', function () {
            var markerId = marker.id;
            console.log('markerLost', markerId);

            // アニメーションの停止
            // document.querySelector('#box').emit('markerlost');
        });
    }
});