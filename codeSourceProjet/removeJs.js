
var marginvis3 = {top: 20, right: 20, bottom: 100, left: 40},
    widthvis3 = 730 - marginvis3.left - marginvis3.right,
    heightvis3 = 450 - marginvis3.top - marginvis3.bottom;

var x0vis3 = d3version3.scale.ordinal()
    .rangeRoundBands([0, widthvis3], .1);

var x1vis3 = d3version3.scale.ordinal();

var yvis3 = d3version3.scale.linear()
    .range([heightvis3, 0]);

var xAxisvis3 = d3version3.svg.axis()
    .scale(x0vis3)
    .tickSize(0)
    .orient("bottom");

var yAxisvis3 = d3version3.svg.axis()
    .scale(yvis3)
    .orient("left");

var colorvis3 = d3version3.scale.ordinal()
    .range(["#d5d5d5", "#ca0020"]);

var svgvis3 = d3version3.select("#barchartdiv2").append("svg")
    .attr("id", "chart")
    .attr("width", widthvis3 + marginvis3.left + marginvis3.right)
    .attr("height", heightvis3 + marginvis3.top + marginvis3.bottom)
    .append("g")
    .attr("transform", "translate(" + marginvis3.left + "," + marginvis3.top + ")");
// var buttons = d3.select("#buttons")
d3version3.json("data2.json", function (error, data) {


    var diventervis3 = d3version3.select("#buttons").selectAll("div")
        .data(data)
        .enter().append("div")
        .attr("class", "col-md-6 custom-control custom-checkbox");


    diventervis3.append("input")
        .attr("type", "checkbox")
        .attr("class", "custom-control-input m")
        .attr("id", function (d, i) {
            return "premier" + i;

        })
        .attr("value", function (d, i) {
            return i;
        })
        .property('checked', function (d) {
            if (d.values[1].value == "0") {
                return false;
            } else {
                return true;
            }
        })
        .on("change", updatevis3);
    updatevis3();
    diventervis3.append("label")
        .attr("class", "custom-control-label")
        .attr("for", function (d, i) {
            return "premier" + i;

        })
        .attr("style", "font-size: 12px;padding-top: 5px")
        .text(function (d, i) {
            return d.categorie;
        });


    var categoriesNamesvis3 = data.map(function (d) {
        return d.categorie;
    });
    var rateNamesvis3 = data[0].values.map(function (d) {
        return d.rate;
    });

    x0vis3.domain(categoriesNamesvis3);
    x1vis3.domain(rateNamesvis3).rangeRoundBands([0, x0vis3.rangeBand()]);
    yvis3.domain([0, d3version3.max(data, function (categorie) {
        return d3version3.max(categorie.values, function (d) {
            return d.value;
        });
    })]);

    var stickvis3 = svgvis3.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + heightvis3 + ")")
        .call(xAxisvis3);
    if (data.length > 8) {
        stickvis3.selectAll("text")
            .style("text-anchor", "end")
            .attr("transform", function (d) {
                return "rotate(-65)"
            });
    }
    var textconsommationvis3 = svgvis3.append("g")
        .attr("class", "y axis")
        .style('opacity', '0')
        .call(yAxisvis3)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 2)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .style('font-weight', 'bold')
        .text("Consommation (Ko)");
    if (data.length > 8) {
        textconsommationvis3.style("font-size", "6px")
    }

    svgvis3.select('.y').transition().duration(500).delay(1300).style('opacity', '1');

    var slicevis3 = svgvis3.selectAll(".slice")
        .data(data)
        .enter().append("g")
        .attr("class", "g")
        .attr("transform", function (d) {
            return "translate(" + x0vis3(d.categorie) + ",0)";
        });

    slicevis3.selectAll("rect")
        .data(function (d) {
            return d.values;
        })
        .enter().append("rect")
        .attr("width", x1vis3.rangeBand())
        .attr("x", function (d) {
            return x1vis3(d.rate);
        })
        .style("fill", function (d) {
            return colorvis3(d.rate)
        })
        .attr("y", function (d) {
            return yvis3(0);
        })
        .attr("height", function (d) {
            return heightvis3 - yvis3(0);
        })
        .on("mouseover", function (d) {
            d3version3.select(this).style("fill", d3version3.rgb(colorvis3(d.rate)).darker(2));
        })
        .on("mouseout", function (d) {
            d3version3.select(this).style("fill", colorvis3(d.rate));
        });

    slicevis3.selectAll("rect")
        .transition()
        .delay(function (d) {
            return Math.random() * 1000;
        })
        .duration(1000)
        .attr("y", function (d) {
            return yvis3(d.value);
        })
        .attr("height", function (d) {
            return heightvis3 - yvis3(d.value);
        });

    //Legend
    var legendvis3 = svgvis3.selectAll(".legend")
        .data(data[0].values.map(function (d) {
            return d.rate;
        }).reverse())
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function (d, i) {
            return "translate(0," + i * 20 + ")";
        })
        .style("opacity", "0");

    legendvis3.append("rect")
        .attr("x", widthvis3 - 18)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", function (d) {
            return colorvis3(d);
        });

    legendvis3.append("text")
        .attr("x", widthvis3 - 24)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(function (d) {
            return d;
        });

    legendvis3.transition().duration(500).delay(function (d, i) {
        return 1300 + 100 * i;
    }).style("opacity", "1");

});

function updatevis3() {


    //remove elements
    var elementvis3 = document.getElementById("chart");
    elementvis3.parentNode.removeChild(elementvis3);

    var svgvis3 = d3version3.select("#barchartdiv2").append("svg")
        .attr("id", "chart")
        .attr("width", widthvis3 + marginvis3.left + marginvis3.right)
        .attr("height", heightvis3 + marginvis3.top + marginvis3.bottom)
        .append("g")
        .attr("transform", "translate(" + marginvis3.left + "," + marginvis3.top + ")");

    d3version3.json("data2.json", function (error, data) {
        var inputvis3;
        var data2vis3 = [];
        var jvis3 = 0;
        for (i = 0; i < data.length; i++) {
            inputvis3 = d3version3.select("#premier" + i).property("checked");
            if (inputvis3) {
                data2vis3[jvis3] = data[i];
                jvis3++;
            }
        }
        data = data2vis3;
        // data.splice(0, 1);

        var categoriesNamesvis3 = data.map(function (d) {
            return d.categorie;
        });
        var rateNamesvis3 = data[0].values.map(function (d) {
            return d.rate;
        });

        x0vis3.domain(categoriesNamesvis3);
        x1vis3.domain(rateNamesvis3).rangeRoundBands([0, x0vis3.rangeBand()]);
        yvis3.domain([0, d3version3.max(data, function (categorie) {
            return d3version3.max(categorie.values, function (d) {
                return d.value;
            });
        })]);

        var stickvis3 = svgvis3.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + heightvis3 + ")")
            .call(xAxisvis3);
        if (data.length > 8) {
            stickvis3.selectAll("text")
                .style("text-anchor", "end")
                .attr("transform", function (d) {
                    return "rotate(-65)"
                });
        }

        var textconsommationvis3 = svgvis3.append("g")
            .attr("class", "y axis")
            .style('opacity', '0')
            .call(yAxisvis3)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 2)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .style('font-weight', 'bold')
            .text("Consommation (Ko)");
        if (data.length > 8) {
            textconsommationvis3.style("font-size", "6px")
        }
        svgvis3.select('.y').transition().duration(500).delay(1300).style('opacity', '1');

        var slicevis3 = svgvis3.selectAll(".slice")
            .data(data)
            .enter().append("g")
            .attr("class", "g")
            .attr("transform", function (d) {
                return "translate(" + x0vis3(d.categorie) + ",0)";
            });

        slicevis3.selectAll("rect")
            .data(function (d) {
                return d.values;
            })
            .enter().append("rect")
            .attr("width", x1vis3.rangeBand())
            .attr("x", function (d) {
                return x1vis3(d.rate);
            })
            .style("fill", function (d) {
                return colorvis3(d.rate)
            })
            .attr("y", function (d) {
                return yvis3(0);
            })
            .attr("height", function (d) {
                return heightvis3 - yvis3(0);
            })
            .on("mouseover", function (d) {
                d3version3.select(this).style("fill", d3version3.rgb(colorvis3(d.rate)).darker(2));
            })
            .on("mouseout", function (d) {
                d3version3.select(this).style("fill", colorvis3(d.rate));
            });

        slicevis3.selectAll("rect")
            .transition()
            .delay(function (d) {
                return Math.random() * 1000;
            })
            .duration(1000)
            .attr("y", function (d) {
                return yvis3(d.value);
            })
            .attr("height", function (d) {
                return heightvis3 - yvis3(d.value);
            });

        //Legend
        var legendvis3 = svgvis3.selectAll(".legend")
            .data(data[0].values.map(function (d) {
                return d.rate;
            }).reverse())
            .enter().append("g")
            .attr("class", "legend")
            .attr("transform", function (d, i) {
                return "translate(0," + i * 20 + ")";
            })
            .style("opacity", "0");

        legendvis3.append("rect")
            .attr("x", widthvis3 - 18)
            .attr("width", 18)
            .attr("height", 18)
            .style("fill", function (d) {
                return colorvis3(d);
            });

        legendvis3.append("text")
            .attr("x", widthvis3 - 24)
            .attr("y", 9)
            .attr("dy", ".35em")
            .style("text-anchor", "end")
            .text(function (d) {
                return d;
            });

        legendvis3.transition().duration(500).delay(function (d, i) {
            return 1300 + 100 * i;
        }).style("opacity", "1");

    });
}


