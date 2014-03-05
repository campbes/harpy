describe("Harpy.Viewer", function() {

    beforeEach(function(){
        Viewer = Harpy.Viewer({
            harpify : Harpy.harpify(Harpy),
            render : Harpy.render,
            util : Harpy.util
        });
        Harpy.Templates = {
            timeline : returner,
            data :returner,
            info : returner
        }
    });

    it("creates viewer", function() {
        expect(new Viewer(har)).toBeDefined();
    });

    it("draws viewer", function() {
        expect(new Viewer(har).draw("div").el).toBe("div");
    });

    it("shows info", function() {
        var obj = document.createElement("TR");
        obj.setAttribute("data-id",1);
        expect(new Viewer(har).showInfo(obj)).toBe(obj);
    });

});