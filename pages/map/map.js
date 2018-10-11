Page({
    data: {
        // tab选中
        tabSelect: 'map',
        // 点标记
        markers: [],
        // 拆线
        polyline: [],
        // 多边形
        polygons: [],
        // 自定义图形显示开关
        polygonsShow: false,
        //中心纬度
        latitude: '',
        // 中心经度
        longitude: '',
        // 缩放级别，取值范围为5-18
        scale: 14,
        //卫片信息显示隐藏
        satelliteInformationShow: false,
        // 执法人员详情
        personnelDel: {
            show: false,
            delShow: false,
            path: null,
            data: {}
        },
        // 执法人员列表详情
        personnellistDel: [{
                name: '',
                headImg: '',
                // 距离
                distance: '',
                delShow: false,
                path: null,
                data: {
                    // 同行人员
                    peerStaff: [],
                    // 联系方式
                    phone: '',
                    // 所属部门
                    department: '',
                    // 巡查里程
                    mileage: '',
                    // 在线时长
                    onlineTime: ''
                }
            },
            {
                delShow: false,
                path: null,
                data: {}
            },
            {
                delShow: false,
                path: null,
                data: {}
            }
        ],
        // 指挥调度详情
        commanDel: {
            show: true
        }
    },
    onLoad: function (options) {
        // 在页面加载时进行一些初始化
        var that = this;
        // 添加线
        that.setData({
            polyline: [{
                points: [{
                        latitude: 22.54046,
                        longitude: 113.957566
                    },
                    {
                        latitude: 22.551122,
                        longitude: 113.951686
                    }
                ],
                color: '#0091ff',
                width: 6
            }]
        })

        // 添加标记点点
        that.setData({
            markers: [{
                    iconPath: '../../lib/images/map_card_icon_locate.png',
                    id: 1,
                    title: '起点',
                    latitude: 22.544982157032706,
                    longitude: 113.94446465616888,
                    width: 23,
                    height: 33,
                    ifpolygons: false,
                    personnel: true
                },
                {
                    iconPath: '../../lib/images/map_card_icon_locate.png',
                    title: '终点',
                    id: 2,
                    latitude: 22.545275,
                    longitude: 113.944412,
                    width: 24,
                    height: 34,
                    ifpolygons: false,
                    personnel: true
                }
            ]
        })
    },
    onReady: function () {
        // 当页面准备
        this.getLocation();
    },
    onShow: function () {
        // 页面show.
        // 保持屏幕常亮
        wx.setKeepScreenOn({
            keepScreenOn: true
        });
    },
    onHide: function () {
        // 页面隐藏
    },
    onUnload: function () {
        // 页面关闭时。
    },
    onPullDownRefresh: function () {
        // 下拉时。
    },
    onReachBottom: function () {
        // 页面到达底部时执行某些操作。
    },
    onPageScroll: function () {
        // 页面滚动时执行某些操作
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        return {
            // title: '直播播放器',
            // path: '/pages/play/play',
            // path: '/pages/main/main',
            // imageUrl: 'https://mc.qcloudimg.com/static/img/dacf9205fe088ec2fef6f0b781c92510/share.png'
        };
    },

    //table切换
    tabChange: function (data) {
        console.log(data);
        this.setData({
            tabSelect: data,
            personnelDel: {
                show: false
            }
        });
    },
    // 获取当前位置信息
    getLocation: function () {
        var that = this;
        wx.getLocation({
            type: 'wgs84',
            altitude: true,
            success: function (res) {
                var longitude = res.longitude;
                var latitude = res.latitude;
                that.setData({
                    longitude: longitude,
                    latitude: latitude
                });

                that.controltap();
                console.log(res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    },
    // 点击标记点时触发，会返回marker的id
    makertap: function (e) {
        console.log(e);
        const data = this.data.markers;
        for (let i = 0; i < data.length; i++) {
            if (data[i].ifpolygons && data[i].id == e.markerId) {
                console.log('点击的是多边形，ifpolygons=' + data[i].ifpolygons);
                this.setData({
                    satelliteInformationShow: true
                });
            } else if (data[i].personnel && data[i].id == e.markerId) {
                console.log('点击的执法人员');
                this.setData({
                    personnelDel: {
                        show: true
                    }
                });
            }
        }
    },
    regionchange: function (e) {
        console.log(e.type);
    },
    markertap: function (e) {
        console.log(e);
    },
    controltap: function (e) {
        const mapCtx = wx.createMapContext('map');
        mapCtx.moveToLocation();
        this.data.scale = 14;
    },
    // 地图放大
    addScale: function () {
        this.setData({
            scale: this.data.scale + 1
        });
        if (this.data.scale >= 18) {
            this.setData({
                scale: 18
            });
        }
    },
    // 地图缩放
    reduceScale: function () {
        this.setData({
            scale: this.data.scale - 1
        });
        if (this.data.scale <= 5) {
            this.setData({
                scale: 5
            });
        }
    },
    // 添加自定义图形
    addPolygons: function () {
        var that = this;
        that.setData({
            personnelDel: {
                show: false
            }
        });
        that.setData({
            polygonsShow: !that.data.polygonsShow
        });
        if (!that.data.polygonsShow) {
            const data = this.data.polygons;
            for (let i = 0; i < data.length; i++) {
                for (let j = 0; j < data[i].points.length; j++) {
                    if (j == 0) {
                        const datas = that.data.markers;
                        for (let k = 0; k < datas.length; k++) {
                            if (
                                datas[k].latitude == data[i].points[j].latitude &&
                                datas[k].longitude == data[i].points[j].longitude
                            ) {
                                that.setData({
                                    markers: that.data.markers.splice(k, 1)
                                });
                            }
                        }
                    }
                }
            }
            that.setData({
                polygons: []
            });
        } else {
            that.setData({
                polygons: [{
                        points: [{
                                longitude: 114.24337,
                                latitude: 22.590155
                            },
                            {
                                longitude: 114.244015,
                                latitude: 22.590151
                            },
                            {
                                longitude: 114.2441,
                                latitude: 22.590148
                            },
                            {
                                longitude: 114.244398,
                                latitude: 22.590295
                            },
                            {
                                longitude: 114.2445,
                                latitude: 22.59018
                            },
                            {
                                longitude: 114.244597,
                                latitude: 22.590055
                            },
                            {
                                longitude: 114.244561,
                                latitude: 22.589792
                            },
                            {
                                longitude: 114.244439,
                                latitude: 22.589599
                            },
                            {
                                longitude: 114.244454,
                                latitude: 22.589309
                            },
                            {
                                longitude: 114.244619,
                                latitude: 22.589144
                            },
                            {
                                longitude: 114.244716,
                                latitude: 22.589215
                            },
                            {
                                longitude: 114.245205,
                                latitude: 22.589787
                            },
                            {
                                longitude: 114.24564,
                                latitude: 22.589863
                            },
                            {
                                longitude: 114.246042,
                                latitude: 22.589873
                            },
                            {
                                longitude: 114.245676,
                                latitude: 22.589513
                            },
                            {
                                longitude: 114.244955,
                                latitude: 22.588769
                            },
                            {
                                longitude: 114.244465,
                                latitude: 22.588271
                            },
                            {
                                longitude: 114.244241,
                                latitude: 22.588189
                            },
                            {
                                longitude: 114.244073,
                                latitude: 22.58829
                            },
                            {
                                longitude: 114.242209,
                                latitude: 22.590528
                            },
                            {
                                longitude: 114.242456,
                                latitude: 22.590526
                            },
                            {
                                longitude: 114.24266,
                                latitude: 22.590272
                            },
                            {
                                longitude: 114.24294,
                                latitude: 22.590047
                            },
                            {
                                longitude: 114.243091,
                                latitude: 22.590007
                            },
                            {
                                longitude: 114.24337,
                                latitude: 22.590155
                            }
                        ],
                        strokeColor: '#0091ff50',
                        fillColor: '#0091ff50',
                        strokeWidth: 2,
                        zIndex: 6
                    },
                    {
                        points: [{
                                latitude: 22.547268,
                                longitude: 113.951364
                            },
                            {
                                latitude: 22.546792,
                                longitude: 113.970419
                            },
                            {
                                latitude: 22.557017,
                                longitude: 113.969732
                            },
                            {
                                latitude: 22.556938,
                                longitude: 113.951794
                            }
                        ],
                        strokeWidth: 2
                    }
                ]
            });
            const data = this.data.polygons;
            for (let i = 0; i < data.length; i++) {
                for (let j = 0; j < data[i].points.length; j++) {
                    if (j == 0) {
                        that.setData({
                            markers: that.data.markers.push({
                                iconPath: '../../lib/images/map_card_icon_locate.png',
                                id: data[i].points[j].latitude,
                                latitude: data[i].points[j].latitude,
                                longitude: data[i].points[j].longitude,
                                width: 23,
                                height: 33,
                                ifpolygons: true,
                                anchor: true
                            })
                        })
                    }
                }
            }
        }
    },
    // 查看地图
    lookMap: function () {
        const mapCtx = wx.createMapContext('map');
        console.log(mapCtx);
    },
    // 开启/关闭卫片信息
    tabSatelliteInformation: function () {
        this.setData({
            satelliteInformationShow: false
        });
    },
    // 执法人员详情显示/隐藏
    tabSersonnelDel: function () {
        this.setData({
            personnelDel: {
                delShow: !this.data.personnelDel.delShow
            }
        });
    },
    // 折线图标点击
    pathBtn: function () {
        console.log('折线图标点击');
        wx.navigateTo({
            url: '/pages/pathline'
        });
    },
    // 指挥图标点击
    commanBtn: function () {
        console.log('指挥图标点击');
        wx.navigateTo({
            url: '/pages/commanpage'
        });
    },
    // 视频图标点击
    videoBtn: function () {
        console.log('视频图标点击');

        wx.navigateTo({
            url: '/pages/video/selectionstaff'
        });
    },
    // 电话图标点击
    callBtn: function () {
        console.log('电话图标点击');
    }
});