describe("Harpy", function(){

    beforeEach(function(){
        Harpy.init();
    });

    it("initialises correctly", function() {
        expect(Harpy.init).toBeUndefined();
    });

});