describe("Harpy.render", function(){

    it("draws bar chart",function(){
        expect(Harpy.render.drawBarChart("test",[])).toBe(chart);
    });

    it("draws pie charts",function(){
        expect(Harpy.render.drawPieCharts("test",{time : {colors : {}}},{time : {colors : {}}})).toBeDefined();
    });

});