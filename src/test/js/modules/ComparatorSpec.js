describe("Harpy.Comparator", function() {

    beforeEach(function(){
        Comparator = Harpy.Comparator({
            harpify : Harpy.harpify(Harpy),
            render : Harpy.render
        });
    });

    it("creates comparator", function() {
        expect(new Comparator(har,har)).toBeDefined();
    });

    it("draws comparator", function() {
        expect(new Comparator(har,har).draw("test").el).toBe("test");
    });

});