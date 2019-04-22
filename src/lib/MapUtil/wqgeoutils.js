var WqMapLib = window.WqMapLib = WqMapLib || {};

(function() {
    var WqGeoUtils = WqMapLib.WqGeoUtils = function() {}

    /**
     * 计算两个多边形相交并添加点
     */
    WqGeoUtils.addContainPoint = function(oldpoly, newpoly) {
        //开始判断oldpoly是否有点在newpoly中，并添加相应的点
        var arr = [];
        var oldpoints = oldpoly.so
        var inpoly = false
        for (var i = 0; i < oldpoints.length; i ++) {
            if (WqGeoUtils.isPointInPolygon(oldpoints[i],newpoly)) {
                inpoly = true
                break;
            }
        }
        if ( !inpoly){
            return newpoly.so
        }

        for (var i = 0; i < oldpoints.length; i ++) {
            if (WqGeoUtils.isPointInPolygon(oldpoints[i],newpoly)) {
                // 有一个点在多边形内,这时候需要找到前后两个交点，然后添加点
                //向上找到一个不在多边形内的点，
                var innipoints = []
                var mlastindex = 0;
                innipoints.push(oldpoints[i])
                for ( var j= i-1;j> -oldpoints.length;j--){
                    var mlastindex = j;
                    if ( j < 0){
                        mlastindex = oldpoints.length  + j;
                    }
                    if ( !WqGeoUtils.isPointInPolygon(oldpoints[mlastindex],newpoly)){
                        innipoints.splice(0,0,oldpoints[mlastindex])
                        break;
                    }else{
                        innipoints.splice(0,0,oldpoints[mlastindex])
                    }
                }
                //向下找到一个不在多边形内的点，
                var mnextindex = 0;
                for ( var j= i+1;j < (i+oldpoints.length);j++){
                    var mnextindex = j;
                    if ( j >= oldpoints.length ){
                        mnextindex = j - oldpoints.length;
                    }
                    if ( !WqGeoUtils.isPointInPolygon(oldpoints[mnextindex],newpoly)){
                        innipoints.push(oldpoints[mnextindex])
                        break;
                    }else{
                        innipoints.push(oldpoints[mnextindex])
                    }
                }

                var lastcrossPoint = WqGeoUtils.getCrossPoint(innipoints[0],innipoints[1],newpoly)
                var nextcrossPoint = WqGeoUtils.getCrossPoint(innipoints[innipoints.length -2 ],innipoints[innipoints.length -1],newpoly)
                innipoints.splice(0,1,lastcrossPoint)
                innipoints.splice(innipoints.length-1,1,nextcrossPoint)
                //已经找到所有的点，等待替换
                var tnewpoints=[]
                for(var t=0;t< newpoly.so.length;t++){
                    tnewpoints.push(newpoly.so[t])
                }
                //遍历确保第一个不在多边形之内
                var step = tnewpoints.length
                var sp = 0;
                while ( sp < step){
                    sp ++
                    if (WqGeoUtils.isPointInPolygon(tnewpoints[0],oldpoly)){
                        tnewpoints.push(tnewpoints[0])
                        tnewpoints.splice(0, 1);
                    }else{
                        break;
                    }
                }
                tnewpoints.push(tnewpoints[0])
                for ( var t =0;t < tnewpoints.length;t++){
                    if (!(tnewpoints[t] && tnewpoints[t+1])) {
                        continue;
                    }
                    var crossPoint = WqGeoUtils.onSegment(tnewpoints[t], tnewpoints[t+1], innipoints[0]);
                    if ( crossPoint){
                        //找到第一个交点，判断那个点在之外
                        if (WqGeoUtils.isPointInPolygon(tnewpoints[t],oldpoly)){//第一个点在多边形内
                            if (WqGeoUtils.isPointInPolygon(tnewpoints[t+1],oldpoly)){//第二个点也在多边形内，不可能

                            }else{//第一个在多边形内，第二个在多边形外
                                //反方向添加数据
                                //添加数据之前需要把在多边形内的点先删掉
                                for(var tp = arr.length -1;tp >=0;tp--){
                                    if ( WqGeoUtils.isPointInPolygon(arr[tp],oldpoly)){
                                        arr.splice(tp,1)
                                    }else{
                                        break;
                                    }
                                }
                                for(var tp=innipoints.length-1;tp>=0;tp--){
                                    arr.push(innipoints[tp])
                                }
                                var out = false
                                for(var findex = t+1;findex< (tnewpoints.length-1);findex ++){

                                    if (!out && WqGeoUtils.isPointInPolygon(tnewpoints[findex],oldpoly)){

                                    }else {
                                        out = true
                                        arr.push(tnewpoints[findex])
                                    }
                                }
                                break;
                            }
                        }else{
                            if (WqGeoUtils.isPointInPolygon(tnewpoints[t+1],oldpoly)){//第一个点在多边形外，第二个在多边形内
                                arr.push(tnewpoints[t])
                                for(var tp=0;tp<innipoints.length;tp++){
                                    arr.push(innipoints[tp])
                                }
                                var out = false
                                for(var findex = t+1;findex< (tnewpoints.length-1);findex ++){

                                    if (!out && WqGeoUtils.isPointInPolygon(tnewpoints[findex],oldpoly,false)){

                                    }else {
                                        out = true
                                        arr.push(tnewpoints[findex])
                                    }
                                }
                                break;
                            }else{ //两个都在多边形外
                                arr.push(tnewpoints[t])
                                if (WqGeoUtils.getDistance(tnewpoints[t],innipoints[0]) < WqGeoUtils.getDistance(tnewpoints[t],innipoints[innipoints.length-1])) {
                                    for (var tp = 0; tp < innipoints.length; tp++) {
                                        arr.push(innipoints[tp])
                                    }
                                }else {
                                    for (var tp = innipoints.length-1; tp >= 0; tp--) {
                                        arr.push(innipoints[tp])
                                    }
                                }
                                for (var findex = t + 1; findex < (tnewpoints.length - 1); findex++) {
                                    arr.push(tnewpoints[findex])
                                }
                                break;
                            }
                        }
                    }else{
                        arr.push(tnewpoints[t])
                    }
                }
                break;
            }
        }
        return arr
    }

    /**
     * 计算两个多边形相交并去掉一个点
     */
    WqGeoUtils.removeContainPoint = function(oldpoly, newpoly) {
        //开始判断newpoly是否有点在oldpoly中，这种情况包括两个互相包含的情况
        var inpoly = false;
        for (var i = 0; i < newpoly.length; i ++) {
            if (WqGeoUtils.isPointInPolygon(newpoly[i],oldpoly)) {
                inpoly = true;
                break;
            }
        }
        if ( !inpoly ){
            //开始处理共线情况
            var arr= newpoly
            var ft = arr[0]
            var lt = arr[arr.length-1]
            arr.push(ft)
            arr.splice(0,0,lt)

            var arrt = []
            for(var i=1;i<=arr.length-2;i++){
                if ((WqGeoUtils.isPointOnPolygon(arr[i-1], oldpoly))&&(WqGeoUtils.isPointOnPolygon(arr[i+1], oldpoly))&&(WqGeoUtils.isPointOnPolygon(arr[i], oldpoly))) {
                    if ((WqGeoUtils.isPointInPolygon(WqGeoUtils.getMiddlePoint(arr[i+1],arr[i]), oldpoly))||(WqGeoUtils.isPointInPolygon(WqGeoUtils.getMiddlePoint(arr[i-1],arr[i]), oldpoly))){
                        //{
                    }else{
                        arrt.push(arr[i])
                    }
                }else{
                    arrt.push(arr[i])
                }
            }

            return arrt
        }
        //遍历确保第一个不在多边形之内
        var step = newpoly.length
        var sp = 0;
        while ( sp < step){
            sp ++
            if (WqGeoUtils.isPointInPolygon(newpoly[0],oldpoly)){
                newpoly.push(newpoly[0])
                newpoly.splice(0, 1);
            }else{
                break;
            }
        }

        var arr = [];
        for (var i = 0; i < newpoly.length; i ++) {
            if (WqGeoUtils.isPointInPolygon(newpoly[i],oldpoly)) {
                // 有一个点在多边形内,这时候取上下两个点，根据上下两个点的情况来去掉当前点
                var lastpointindex = i -1;
                if ( lastpointindex < 0){
                    lastpointindex = newpoly.length -1
                }
                var nextpointindex = i + 1;
                if ( nextpointindex >= newpoly.length){
                    nextpointindex= 0;
                }
                var lastcrossPoint = WqGeoUtils.getCrossPoint(newpoly[lastpointindex],newpoly[i],oldpoly)
                var nextcrossPoint = WqGeoUtils.getCrossPoint(newpoly[i],newpoly[nextpointindex],oldpoly)
                if ( lastcrossPoint ){//上一个点存在交点
                    if ( nextcrossPoint ) {//下一个也存在交点,需要把当前点用两个点替换
                        if ((WqGeoUtils.isPointOnPolygon(newpoly[lastpointindex], oldpoly))&&(WqGeoUtils.isPointOnPolygon(newpoly[nextpointindex], oldpoly))) {
                            //arr.push(lastcrossPoint)
                        }else{
                            arr.push(lastcrossPoint)
                            arr.push(nextcrossPoint)
                        }
                    }else{//上一个点存在交点，下一个点不存在交点
                        arr.push(lastcrossPoint)
                    }
                }else{//上一个点不存在交点，
                    if (nextcrossPoint){ //下一个点存在交点
                        arr.push(nextcrossPoint)
                    }else{//都不存在交点
                        //去掉这个点，什么都不做
                    }
                }
                for( var j=i+1;j<newpoly.length;j++){
                    arr.push(newpoly[j])
                }
                break;
            }else{
                arr.push(newpoly[i])
            }
        }

        //去重
        for(var i=arr.length-1;i>0;i--){
            if ( arr[i] == arr[i-1]){
                arr.splice(i,1)
            }
        }
        if (arr[arr.length -1] == arr[0]){
            arr.splice(0,1)
        }
        return arr
    }

    WqGeoUtils.getMiddlePoint = function (start,end){
        return new BMap.Point((start.lng + end.lng)/2,(start.lat+end.lat)/2);
    }

    WqGeoUtils.isContainer = function (oldpoly, newpoly) {
        var container = 0;
        for (var i = 0; i < newpoly.so.length; i ++) {
            if (WqMapLib.WqGeoUtils.isPointInPolygon(newpoly.so[i],oldpoly)) {
                container ++;
            } else {
                break;
            }
        }
        if (container == newpoly.so.length) {
            return true;
        }
        container = 0;
        for (var i = 0; i < oldpoly.so.length; i ++) {
            if (WqMapLib.WqGeoUtils.isPointInPolygon(oldpoly.so[i],newpoly)) {
                container ++;
            }else{
                break;
            }
        }
        if (container == oldpoly.so.length){
            return true;
        }
    }

    /**
     *  判断是否自相交
     */
    WqGeoUtils.isSelfInter = function (overlay) {
        var newLine = WqGeoUtils.overlayToLine(overlay.so);
        for (var i = 0; i < newLine.length; i ++) {
            for (var j = i+1; j <newLine.length; j ++) {
                var crossPoint = WqGeoUtils.segmentsSelfing(newLine[i].start, newLine[i].end, newLine[j].start, newLine[j].end);
                if (crossPoint) { // 是否有相交点*
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * 获取一个线段与多边形的相交点
     */
    WqGeoUtils.getCrossPoint = function(start, end, overlay) {
        var oldline = WqGeoUtils.overlayToLine(overlay.so);
        for (var i = 0; i < oldline.length; i++) {
            var crossPoint = WqGeoUtils.segmentsIntr(start, end, oldline[i].start, oldline[i].end);
            if (crossPoint) {
                break;
            }
        }
        return crossPoint;
    }

    /**
     * 点集合转线
     */
    WqGeoUtils.overlayToLine = function (arr) {
        var lines = [];
        for (var i = 0; i < arr.length - 1; i++) {
            lines.push({
                start: arr[i],
                end: arr[i + 1]
            });
        }
        lines.push({
            start: arr[arr.length - 1],
            end: arr[0]
        });
        return lines;
    }

    /**
     * 判断点是否在矩形内
     */
    WqGeoUtils.isPointInRect = function (point, bounds) {
        //检查类型是否正确
        if (!(point instanceof BMap.Point) || !(bounds instanceof BMap.Bounds)) {
            return false;
        }
        var sw = bounds.getSouthWest(); //西南脚点
        var ne = bounds.getNorthEast(); //东北脚点
        return (point.lng >= sw.lng && point.lng <= ne.lng && point.lat >= sw.lat && point.lat <= ne.lat);
    }

    /**
     *  判断点是否多边形的顶点或者边上
     */
    WqGeoUtils.isPointOnPolygon = function (point, polygon){
        //检查类型
        if(!(point instanceof BMap.Point) || !(polygon instanceof BMap.Polygon)){
            return false;
        }
        //首先判断点是否在多边形的外包矩形内，如果在，则进一步判断，否则返回false
        var polygonBounds = polygon.getBounds();
        if(!WqGeoUtils.isPointInRect(point, polygonBounds)){
            return false;
        }
        var pts = polygon.getPath();//获取多边形点
        //下述代码来源：http://paulbourke.net/geometry/insidepoly/，进行了部分修改
        //基本思想是利用射线法，计算射线与多边形各边的交点，如果是偶数，则点在多边形外，否则
        //在多边形内。还会考虑一些特殊情况，如点在多边形顶点上，点在多边形边上等特殊情况。
        var N = pts.length;
        var boundOrVertex = true; //如果点位于多边形的顶点或边上，不算做点在多边形内，直接返回false
        var intersectCount = 0;//cross points count of x
        var precision = 2e-10; //浮点类型计算时候与0比较时候的容差
        var p1, p2;//neighbour bound vertices
        var p = point; //测试点

        p1 = pts[0];//left vertex
        for(var i = 1; i <= N; ++i){//check all rays
            if(p.equals(p1)){
                return boundOrVertex;//p is an vertex
            }
            p2 = pts[i % N];//right vertex
            if(p.lat < Math.min(p1.lat, p2.lat) || p.lat > Math.max(p1.lat, p2.lat)){//ray is outside of our interests
                p1 = p2;
                continue;//next ray left point
            }
            if(p.lat > Math.min(p1.lat, p2.lat) && p.lat < Math.max(p1.lat, p2.lat)){//ray is crossing over by the algorithm (common part of)
                if(p.lng <= Math.max(p1.lng, p2.lng)){//x is before of ray
                    if(p1.lat == p2.lat && p.lng >= Math.min(p1.lng, p2.lng)){//overlies on a horizontal ray
                        return boundOrVertex;
                    }

                    if(p1.lng == p2.lng){//ray is vertical
                        if(p1.lng == p.lng){//overlies on a vertical ray
                            return boundOrVertex;
                        }else{//before ray
                            ++intersectCount;
                        }
                    }else{//cross point on the left side
                        var xinters = (p.lat - p1.lat) * (p2.lng - p1.lng) / (p2.lat - p1.lat) + p1.lng;//cross point of lng
                        if(Math.abs(p.lng - xinters) < precision){//overlies on a ray
                            return boundOrVertex;
                        }

                        if(p.lng < xinters){//before ray
                            ++intersectCount;
                        }
                    }
                }
            }else{//special case when ray is crossing through the vertex
                if(p.lat == p2.lat && p.lng <= p2.lng){//p crossing over p2
                    var p3 = pts[(i+1) % N]; //next vertex
                    if(p.lat >= Math.min(p1.lat, p3.lat) && p.lat <= Math.max(p1.lat, p3.lat)){//p.lat lies between p1.lat & p3.lat
                        ++intersectCount;
                    }else{
                        intersectCount += 2;
                    }
                }
            }
            p1 = p2;//next ray left point
        }
        if(intersectCount % 2 == 0){//偶数在多边形外
            return false;
        } else { //奇数在多边形内
            return false;
        }
    }

    /**
     *  判断点是否多边形内
     */
    WqGeoUtils.isPointInPolygon = function(point, polygon) {
        //检查类型
        if (!(point instanceof BMap.Point) || !(polygon instanceof BMap.Polygon)) {
            return false;
        }
        //首先判断点是否在多边形的外包矩形内，如果在，则进一步判断，否则返回false
        var polygonBounds = polygon.getBounds();
        if (!WqGeoUtils.isPointInRect(point, polygonBounds)) {
            return false;
        }
        var pts = polygon.getPath(); //获取多边形点
        //下述代码来源：http://paulbourke.net/geometry/insidepoly/，进行了部分修改
        //基本思想是利用射线法，计算射线与多边形各边的交点，如果是偶数，则点在多边形外，否则
        //在多边形内。还会考虑一些特殊情况，如点在多边形顶点上，点在多边形边上等特殊情况。
        var N = pts.length;
        var boundOrVertex = false; //如果点位于多边形的顶点或边上，不算做点在多边形内，直接返回false
        var intersectCount = 0; //cross points count of x
        var precision = 2e-10; //浮点类型计算时候与0比较时候的容差
        var p1, p2; //neighbour bound vertices
        var p = point; //测试点

        p1 = pts[0]; //left vertex
        for (var i = 1; i <= N; ++i) { //check all rays
            if (p.equals(p1)) {
                return boundOrVertex; //p is an vertex
            }
            p2 = pts[i % N]; //right vertex
            if (p.lat < Math.min(p1.lat, p2.lat) || p.lat > Math.max(p1.lat, p2.lat)) { //ray is outside of our interests
                p1 = p2;
                continue; //next ray left point
            }
            if (p.lat > Math.min(p1.lat, p2.lat) && p.lat < Math.max(p1.lat, p2.lat)) { //ray is crossing over by the algorithm (common part of)
                if (p.lng <= Math.max(p1.lng, p2.lng)) { //x is before of ray
                    if (p1.lat == p2.lat && p.lng >= Math.min(p1.lng, p2.lng)) { //overlies on a horizontal ray
                        return boundOrVertex;
                    }

                    if (p1.lng == p2.lng) { //ray is vertical
                        if (p1.lng == p.lng) { //overlies on a vertical ray
                            return boundOrVertex;
                        } else { //before ray
                            ++intersectCount;
                        }
                    } else { //cross point on the left side
                        var xinters = (p.lat - p1.lat) * (p2.lng - p1.lng) / (p2.lat - p1.lat) + p1.lng; //cross point of lng
                        if (Math.abs(p.lng - xinters) < precision) { //overlies on a ray
                            return boundOrVertex;
                        }

                        if (p.lng < xinters) { //before ray
                            ++intersectCount;
                        }
                    }
                }
            } else { //special case when ray is crossing through the vertex
                if (p.lat == p2.lat && p.lng <= p2.lng) { //p crossing over p2
                    var p3 = pts[(i + 1) % N]; //next vertex
                    if (p.lat >= Math.min(p1.lat, p3.lat) && p.lat <= Math.max(p1.lat, p3.lat)) { //p.lat lies between p1.lat & p3.lat
                        ++intersectCount;
                    } else {
                        intersectCount += 2;
                    }
                }
            }
            p1 = p2; //next ray left point
        }
        if (intersectCount % 2 == 0) { //偶数在多边形外
            return false;
        } else { //奇数在多边形内
            return true;
        }
    }

    /**
     *  判断点是否在线上
     */
    WqGeoUtils.onSegment = function(curPt, nextPt, point) {
        // 首先判断point是否在curPt和nextPt之间，即：此判断该点是否在该线段的外包矩形内
        if (point.lng >= Math.min(curPt.lng, nextPt.lng) && point.lng <= Math.max(curPt.lng, nextPt.lng) && point.lat >= Math.min(curPt.lat, nextPt.lat) && point.lat <= Math.max(curPt.lat, nextPt.lat)) {
            // 判断点是否在直线上公式
            var precision = (curPt.lng - point.lng) * (nextPt.lat - point.lat) - (nextPt.lng - point.lng) * (curPt.lat - point.lat);
            if (precision < 2e-10 && precision > -2e-10) { // 实质判断是否接近0
                return true;
            }
        }
        return false;
    }

    /**
     *求两条线段所在直线的交点, 再判断交点是否在两条线段上.
     *求直线交点时 可通过直线的一般方程 ax+by+c=0 求得
     *然后根据交点的与线段端点的位置关系来判断交点是否在线段上.
     */
    WqGeoUtils.segmentsIntr = function(a, b, c, d) { /** 1 解线性方程组, 求线段交点. **/
        // 如果分母为0 则平行或共线, 不相交
        var denominator = (b.lng - a.lng) * (d.lat - c.lat) - (a.lat - b.lat) * (c.lng - d.lng);
        if (denominator == 0) {
            return false;
        }
        // 线段所在直线的交点坐标 (lat , lng)
        var lat = ((b.lat - a.lat) * (d.lat - c.lat) * (c.lng - a.lng) + (b.lng - a.lng) * (d.lat - c.lat) * a.lat - (d.lng - c.lng) * (b.lat - a.lat) * c.lat) / denominator;
        var lng = -((b.lng - a.lng) * (d.lng - c.lng) * (c.lat - a.lat) + (b.lat - a.lat) * (d.lng - c.lng) * a.lng - (d.lat - c.lat) * (b.lng - a.lng) * c.lng) / denominator;

        /** 2 判断交点是否在两条线段上 **/
        if (
            // 交点在线段1上
        (lat - a.lat) * (lat - b.lat) <= 0 && (lng - a.lng) * (lng - b.lng) <= 0
        // 且交点也在线段2上
        && (lat - c.lat) * (lat - d.lat) <= 0 && (lng - c.lng) * (lng - d.lng) <= 0) {
            // 返回交点p
            return new BMap.Point(lng, lat);
        }
        //否则不相交
        return false
    }

    /**
     *求两条线段所在直线的交点, 再判断交点是否在两条线段上.
     *求直线交点时 可通过直线的一般方程 ax+by+c=0 求得
     *然后根据交点的与线段端点的位置关系来判断交点是否在线段上.
     */
    WqGeoUtils.segmentsSelfing = function (a, b, c, d) {
        if (WqGeoUtils.onSegment(a,b,c)){
            return false
        }
        if (WqGeoUtils.onSegment(a,b,d)){
            return false
        }
        if (WqGeoUtils.onSegment(c,d,a)){
            return false
        }
        if (WqGeoUtils.onSegment(c,d,b)){
            return false
        }
        /** 1 解线性方程组, 求线段交点. **/
        // 如果分母为0 则平行或共线, 不相交
        var denominator = (b.lng - a.lng) * (d.lat - c.lat) - (a.lat - b.lat) * (c.lng - d.lng);
        if (denominator == 0) {
            return false;
        }
        // 线段所在直线的交点坐标 (lat , lng)
        var lat = ((b.lat - a.lat) * (d.lat - c.lat) * (c.lng - a.lng)
            + (b.lng - a.lng) * (d.lat - c.lat) * a.lat
            - (d.lng - c.lng) * (b.lat - a.lat) * c.lat) / denominator;
        var lng = -((b.lng - a.lng) * (d.lng - c.lng) * (c.lat - a.lat)
            + (b.lat - a.lat) * (d.lng - c.lng) * a.lng
            - (d.lat - c.lat) * (b.lng - a.lng) * c.lng) / denominator;

        /** 2 判断交点是否在两条线段上 **/
        if (
            // 交点在线段1上
        (lat - a.lat) * (lat - b.lat) <= 0 && (lng - a.lng) * (lng - b.lng) <= 0
        // 且交点也在线段2上
        && (lat - c.lat) * (lat - d.lat) <= 0 && (lng - c.lng) * (lng - d.lng) <= 0
        ) {
            // 返回交点p
            return true;
        }
        //否则不相交
        return false
    }

    /**
     * 线段是否相交
     * seg: [{ lat: xxx, lng: xxx }, { lat: xxx, lng: xxx }]
     * */
    WqGeoUtils.isSegmentsIntersectant = function(segA, segB) {
        const abc = (segA[0].lat - segB[0].lat) * (segA[1].lng - segB[0].lng) - (segA[0].lng - segB[0].lng) * (segA[1].lat - segB[0].lat);
        const abd = (segA[0].lat - segB[1].lat) * (segA[1].lng - segB[1].lng) - (segA[0].lng - segB[1].lng) * (segA[1].lat - segB[1].lat);
        if (abc * abd >= 0) {
            return false;
        }
        const cda = (segB[0].lat - segA[0].lat) * (segB[1].lng - segA[0].lng) - (segB[0].lng - segA[0].lng) * (segB[1].lat - segA[0].lat);
        const cdb = cda + abc - abd;
        return !(cda * cdb >= 0);
    }

    /**
     * 计算两点之间的距离,两点坐标必须为经纬度
     * @param {point1} Point 点对象
     * @param {point2} Point 点对象
     * @returns {Number} 两点之间距离，单位为米
     */
    WqGeoUtils.getDistance = function(start, end) {
        return Math.sqrt(Math.pow((start.lng - end.lng), 2) + Math.pow((start.lat - end.lat), 2))
    }
})();