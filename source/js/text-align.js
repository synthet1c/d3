var gapY = 50;
var attrs = ['text-anchor','text-anchor','text-anchor','alignment-baseline','alignment-baseline','alignment-baseline','alignment-baseline','alignment-baseline','alignment-baseline','alignment-baseline','alignment-baseline','alignment-baseline','alignment-baseline','alignment-baseline','alignment-baseline','alignment-baseline','alignment-baseline', 'dominant-baseline', 'dominant-baseline', 'dominant-baseline', 'dominant-baseline', 'dominant-baseline', 'dominant-baseline', 'dominant-baseline', 'dominant-baseline', 'dominant-baseline', 'dominant-baseline', 'dominant-baseline', 'dominant-baseline','baseline-shift','baseline-shift','baseline-shift','baseline-shift'];
var settings = ['start','middle','end','alphabetic','ideographic','hanging','mathematical','central','middle','text-before-edge','text-after-edge','before-edge','after-edge','top','text-top','bottom','text-bottom','auto','use-script','no-change','reset-size','ideographic','alphabetic','hanging','mathematical','central','middle','text-after-edge','text-before-edge','sub','super','50%','-20px']
var descs = ['(text-anchor) start','(text-anchor) middle','(text-anchor) end', '(alignment-baseline) alphabetic', '(alignment-baseline) ideographic', '(alignment-baseline) hanging', '(alignment-baseline) mathematical', '(alignment-baseline) central', '(alignment-baseline) middle','(alignment-baseline) text-before-edge','(alignment-baseline) text-after-edge','(alignment-baseline) before-edge','(alignment-baseline) after-edge','(alignment-baseline) top','(alignment-baseline) text-top','(alignment-baseline) bottom','(alignment-baseline) text-bottom','(dominant-baseline) auto','(dominant-baseline) use-script','(dominant-baseline) no-change','(dominant-baseline) reset-size','(dominant-baseline) ideographic','(dominant-baseline) alphabetic','(dominant-baseline) hanging','(dominant-baseline) mathematical','(dominant-baseline) central','(dominant-baseline) middle','(dominant-baseline) text-after-edge','(dominant-baseline) text-before-edge','sub','super','+50%','-20px'];

var svg = d3
	.select("body")
	.append("svg")
	.attr("id","svg")
	.attr("width","100%")
	.attr("height","100%");

for (var p=0; p<attrs.length; p++) {

	var grp = svg
		.append("g")
		.attr("transform","translate(200,"+gapY+")");

	if (p<attrs.length-4) {
		grp
			.append("text")
			.attr(attrs[p],settings[p])
			.attr("id","text_"+p)
			.text(descs[p]);
	} else {
		grp.append("text").attr("id","text2_"+p).text("(baseline-shift) ");
		var txt = document.getElementById("text2_"+p);
		var bb = txt.getBBox();
		var txtLen2 = bb.width;

		grp.append("text")
			.attr("x",txtLen2)
			.attr(attrs[p],settings[p])
			.attr("id","text_"+p)
			.text(descs[p]);
	}

	if (p<3) {
		grp
			.append("circle")
			.attr("cx",0)
			.attr("cy",0)
			.attr("r","5");
	} else {
		var txt = document.getElementById("text_"+p);
		var bb = txt.getBBox();
		if (p<attrs.length-4) {
			var txtLen = bb.width;
		} else {
			var txtLen = bb.width + txtLen2;
		}
		grp
			.append("line")
			.attr("x1",0)
			.attr("y1",0)
			.attr("x2",txtLen)
			.attr("y2",0);
	}
	gapY += 50;
}

var svg = document.getElementById("svg");
var bb = svg.getBBox();
svg.style.height = bb.y + bb.height;