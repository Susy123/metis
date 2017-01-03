import echarts from 'echarts'

var itemStyle = {
    normal: {
        areaStyle: {
            type: 'default'
        }
    }
};

export default {
    container: document.getElementById('radar'),
    opts: {
        legend: {
            x: 'center',
            data: []
        },
        calculable: true,
        polar: [
            {
                indicator: [],
                center: ['25%', '50%'],
                radius: 130
            },
            {
                indicator: [],
                center: ['75%', '50%'],
                radius: 130
            }
        ],
        series: [
            {
                type: 'radar',
                radarIndex: 0,
                itemStyle: itemStyle,
                data: []
            },
            {
                type: 'radar',
                radarIndex: 1,
                itemStyle: itemStyle,
                data: []
            }
        ]
    },
    sketch (data) {
        for (let city in data.data) {
            var index = 0;
            var vals1 = [];
            var vals2 = [];
            for (let key in data.data[city]) {
                if (index < 6) {
                    vals1.push(data.data[city][key]);
                } else {
                    vals2.push(data.data[city][key]);
                }
                index++;
            }
            this.opts.legend.data.push(city);
            this.opts.series[0].data.push({
                value: vals1,
                name: city
            });
            this.opts.series[1].data.push({
                value: vals2,
                name: city
            });
        }
        this.opts.polar[0].indicator = data.indicator1;
        this.opts.polar[1].indicator = data.indicator2;
        echarts.init(this.container).setOption(this.opts);
    }
}
