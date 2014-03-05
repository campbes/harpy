describe("Harpy.util", function(){

    describe("Harpy.util.getMimetype", function() {

        it("identifies image", function() {
            expect(Harpy.util.getMimetype("image/jpeg")).toBe("image");
        });
        it("identifies js", function() {
            expect(Harpy.util.getMimetype("application/javascript")).toBe("js");
        });
        it("identifies html", function() {
            expect(Harpy.util.getMimetype("text/html")).toBe("html");
        });
        it("identifies css", function() {
            expect(Harpy.util.getMimetype("text/css")).toBe("css");
        });
        it("identifies text", function() {
            expect(Harpy.util.getMimetype("text/text")).toBe("text");
        });
        it("identifies other", function() {
            expect(Harpy.util.getMimetype("something/random")).toBe("other");
        });
    });

    describe("Harpy.util.format", function() {

        it("formats time", function() {
            expect(Harpy.util.format(12345,"time")).toBe("12.35 s");
        });

        it("formats time when less than 1s", function() {
            expect(Harpy.util.format(123,"time")).toBe("123 ms");
        });

        it("formats size", function() {
            expect(Harpy.util.format(12345,"size")).toBe("12.1 KB");
        });

        it("formats size when less than 1KB", function() {
            expect(Harpy.util.format(1023,"size")).toBe("1023 B");
        });

        it("returns value unformatted when type not specified", function() {
            expect(Harpy.util.format(1023)).toBe(1023);
        });

    });

    describe("Harpy.util.trimmer", function() {

        it("trims when long", function() {
            expect(Harpy.util.trimmer("A string that's longer than 10",10)).toBe("A string t...");
        });

        it("doesn't trim when long", function() {
            expect(Harpy.util.trimmer("1234567890",10)).toBe("1234567890");
        });

        it("does a reverse trim", function() {
            expect(Harpy.util.trimmer("A string that's longer than 10",10,true)).toBe("...er than 10");
        });

    });

    describe("Harpy.util.unitise", function() {

        var div = document.createElement("DIV");
        div.setAttribute("data-size",100);

        it("correctly unitises", function() {
            expect(Harpy.util.unitise(div,"data-size",0.5)).toBe(50);
        });

    });

});
