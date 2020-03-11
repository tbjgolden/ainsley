const csstree = require('css-tree');
require('isomorphic-fetch');

// const css = `.fsH1{font-size:72px;line-height:1.2}.fsH2{font-size:48px;line-height:1.2}.fsH3{font-size:32px;line-height:1.2}.fsH4{font-size:24px;line-height:1.2}.fsH5{font-size:20px;line-height:1.2}.fsLG{font-size:20px;line-height:1.2}.fsMD{font-size:16px;line-height:1.2}.fsSM{font-size:14px;line-height:1.2}.fsXS{font-size:12px;line-height:1.2}.cW{color:white}.cB{color:black}.cTR{color:transparent}.cG98{color:hsl(0,0%,98%)}.cG94{color:hsl(0,0%,94%)}.cG88{color:hsl(0,0%,88%)}.cG80{color:hsl(0,0%,80%)}.cG30{color:hsl(0,0%,30%)}.cG20{color:hsl(0,0%,20%)}.cG10{color:hsl(0,0%,10%)}.cB05{color:hsla(0,0%,0%,05%)}.cB10{color:hsla(0,0%,0%,10%)}.cB20{color:hsla(0,0%,0%,20%)}.cB40{color:hsla(0,0%,0%,40%)}.cB80{color:hsla(0,0%,0%,80%)}.cW05{color:hsla(0,0%,100%,05%)}.cW10{color:hsla(0,0%,100%,10%)}.cW20{color:hsla(0,0%,100%,20%)}.cW40{color:hsla(0,0%,100%,40%)}.cW80{color:hsla(0,0%,100%,80%)}.cPRIMARY{color:#8d1d90}.cALTPRIMARY{color:#9d3ea0}.cSECONDARY{color:#b7de58}.cALTSECONDARY{color:#c1e270}.cGOOD{color:#3bb273}.cLIGHTGOOD{color:#ebf7f1}.cWARN{color:#e1bc29}.cLIGHTWARN{color:#fcf8e9}.cBAD{color:#e15554}.cLIGHTBAD{color:#fceeed}.cMSG{color:#3d70b2}.cLIGHTMSG{color:#ebf0f7}.bgcW{background-color:white}.bgcB{background-color:black}.bgcTR{background-color:transparent}.bgcG98{background-color:hsl(0,0%,98%)}.bgcG94{background-color:hsl(0,0%,94%)}.bgcG88{background-color:hsl(0,0%,88%)}.bgcG80{background-color:hsl(0,0%,80%)}.bgcG30{background-color:hsl(0,0%,30%)}.bgcG20{background-color:hsl(0,0%,20%)}.bgcG10{background-color:hsl(0,0%,10%)}.bgcB05{background-color:hsla(0,0%,0%,05%)}.bgcB10{background-color:hsla(0,0%,0%,10%)}.bgcB20{background-color:hsla(0,0%,0%,20%)}.bgcB40{background-color:hsla(0,0%,0%,40%)}.bgcB80{background-color:hsla(0,0%,0%,80%)}.bgcW05{background-color:hsla(0,0%,100%,05%)}.bgcW10{background-color:hsla(0,0%,100%,10%)}.bgcW20{background-color:hsla(0,0%,100%,20%)}.bgcW40{background-color:hsla(0,0%,100%,40%)}.bgcW80{background-color:hsla(0,0%,100%,80%)}.bgcPRIMARY{background-color:#8d1d90}.bgcALTPRIMARY{background-color:#9d3ea0}.bgcSECONDARY{background-color:#b7de58}.bgcALTSECONDARY{background-color:#c1e270}.bgcGOOD{background-color:#3bb273}.bgcLIGHTGOOD{background-color:#ebf7f1}.bgcWARN{background-color:#e1bc29}.bgcLIGHTWARN{background-color:#fcf8e9}.bgcBAD{background-color:#e15554}.bgcLIGHTBAD{background-color:#fceeed}.bgcMSG{background-color:#3d70b2}.bgcLIGHTMSG{background-color:#ebf0f7}.w0{width:0}.w1{width:1px}.w2{width:2px}.w3{width:3px}.w10{width:4px}.w15{width:6px}.w20{width:8px}.w25{width:12px}.w30{width:16px}.w35{width:24px}.w40{width:32px}.w45{width:48px}.w50{width:64px}.w55{width:96px}.w60{width:128px}.w65{width:192px}.w70{width:256px}.w75{width:384px}.w80{width:512px}.w85{width:768px}.w90{width:1024px}.w95{width:1536px}.wP50{width:50%}.wP{width:100%}.wH{width:100vh}.wW{width:100vw}.wX{width:11111111px}.xw0{max-width:0}.xw1{max-width:1px}.xw2{max-width:2px}.xw3{max-width:3px}.xw10{max-width:4px}.xw15{max-width:6px}.xw20{max-width:8px}.xw25{max-width:12px}.xw30{max-width:16px}.xw35{max-width:24px}.xw40{max-width:32px}.xw45{max-width:48px}.xw50{max-width:64px}.xw55{max-width:96px}.xw60{max-width:128px}.xw65{max-width:192px}.xw70{max-width:256px}.xw75{max-width:384px}.xw80{max-width:512px}.xw85{max-width:768px}.xw90{max-width:1024px}.xw95{max-width:1536px}.xwP50{max-width:50%}.xwP{max-width:100%}.xwH{max-width:100vh}.xwW{max-width:100vw}.xwX{max-width:11111111px}.nw0{min-width:0}.nw1{min-width:1px}.nw2{min-width:2px}.nw3{min-width:3px}.nw10{min-width:4px}.nw15{min-width:6px}.nw20{min-width:8px}.nw25{min-width:12px}.nw30{min-width:16px}.nw35{min-width:24px}.nw40{min-width:32px}.nw45{min-width:48px}.nw50{min-width:64px}.nw55{min-width:96px}.nw60{min-width:128px}.nw65{min-width:192px}.nw70{min-width:256px}.nw75{min-width:384px}.nw80{min-width:512px}.nw85{min-width:768px}.nw90{min-width:1024px}.nw95{min-width:1536px}.nwP50{min-width:50%}.nwP{min-width:100%}.nwH{min-width:100vh}.nwW{min-width:100vw}.nwX{min-width:11111111px}.h0{height:0}.h1{height:1px}.h2{height:2px}.h3{height:3px}.h10{height:4px}.h15{height:6px}.h20{height:8px}.h25{height:12px}.h30{height:16px}.h35{height:24px}.h40{height:32px}.h45{height:48px}.h50{height:64px}.h55{height:96px}.h60{height:128px}.h65{height:192px}.h70{height:256px}.h75{height:384px}.h80{height:512px}.h85{height:768px}.h90{height:1024px}.h95{height:1536px}.hP50{height:50%}.hP{height:100%}.hH{height:100vh}.hW{height:100vw}.hX{height:11111111px}.xh0{max-height:0}.xh1{max-height:1px}.xh2{max-height:2px}.xh3{max-height:3px}.xh10{max-height:4px}.xh15{max-height:6px}.xh20{max-height:8px}.xh25{max-height:12px}.xh30{max-height:16px}.xh35{max-height:24px}.xh40{max-height:32px}.xh45{max-height:48px}.xh50{max-height:64px}.xh55{max-height:96px}.xh60{max-height:128px}.xh65{max-height:192px}.xh70{max-height:256px}.xh75{max-height:384px}.xh80{max-height:512px}.xh85{max-height:768px}.xh90{max-height:1024px}.xh95{max-height:1536px}.xhP50{max-height:50%}.xhP{max-height:100%}.xhH{max-height:100vh}.xhW{max-height:100vw}.xhX{max-height:11111111px}.nh0{min-height:0}.nh1{min-height:1px}.nh2{min-height:2px}.nh3{min-height:3px}.nh10{min-height:4px}.nh15{min-height:6px}.nh20{min-height:8px}.nh25{min-height:12px}.nh30{min-height:16px}.nh35{min-height:24px}.nh40{min-height:32px}.nh45{min-height:48px}.nh50{min-height:64px}.nh55{min-height:96px}.nh60{min-height:128px}.nh65{min-height:192px}.nh70{min-height:256px}.nh75{min-height:384px}.nh80{min-height:512px}.nh85{min-height:768px}.nh90{min-height:1024px}.nh95{min-height:1536px}.nhP50{min-height:50%}.nhP{min-height:100%}.nhH{min-height:100vh}.nhW{min-height:100vw}.nhX{min-height:11111111px}.t0{top:0}.t1{top:1px}.t2{top:2px}.t3{top:3px}.t10{top:4px}.t15{top:6px}.t20{top:8px}.t25{top:12px}.t30{top:16px}.t35{top:24px}.t40{top:32px}.t45{top:48px}.t50{top:64px}.t55{top:96px}.t60{top:128px}.t65{top:192px}.t70{top:256px}.t75{top:384px}.t80{top:512px}.t85{top:768px}.t90{top:1024px}.t95{top:1536px}.tP50{top:50%}.tP{top:100%}.tH{top:100vh}.tW{top:100vw}.tX{top:11111111px}.l0{left:0}.l1{left:1px}.l2{left:2px}.l3{left:3px}.l10{left:4px}.l15{left:6px}.l20{left:8px}.l25{left:12px}.l30{left:16px}.l35{left:24px}.l40{left:32px}.l45{left:48px}.l50{left:64px}.l55{left:96px}.l60{left:128px}.l65{left:192px}.l70{left:256px}.l75{left:384px}.l80{left:512px}.l85{left:768px}.l90{left:1024px}.l95{left:1536px}.lP50{left:50%}.lP{left:100%}.lH{left:100vh}.lW{left:100vw}.lX{left:11111111px}.r0{right:0}.r1{right:1px}.r2{right:2px}.r3{right:3px}.r10{right:4px}.r15{right:6px}.r20{right:8px}.r25{right:12px}.r30{right:16px}.r35{right:24px}.r40{right:32px}.r45{right:48px}.r50{right:64px}.r55{right:96px}.r60{right:128px}.r65{right:192px}.r70{right:256px}.r75{right:384px}.r80{right:512px}.r85{right:768px}.r90{right:1024px}.r95{right:1536px}.rP50{right:50%}.rP{right:100%}.rH{right:100vh}.rW{right:100vw}.rX{right:11111111px}.b0{bottom:0}.b1{bottom:1px}.b2{bottom:2px}.b3{bottom:3px}.b10{bottom:4px}.b15{bottom:6px}.b20{bottom:8px}.b25{bottom:12px}.b30{bottom:16px}.b35{bottom:24px}.b40{bottom:32px}.b45{bottom:48px}.b50{bottom:64px}.b55{bottom:96px}.b60{bottom:128px}.b65{bottom:192px}.b70{bottom:256px}.b75{bottom:384px}.b80{bottom:512px}.b85{bottom:768px}.b90{bottom:1024px}.b95{bottom:1536px}.bP50{bottom:50%}.bP{bottom:100%}.bH{bottom:100vh}.bW{bottom:100vw}.bX{bottom:11111111px}.br0{border-radius:0}.br1{border-radius:1px}.br2{border-radius:2px}.br3{border-radius:3px}.br10{border-radius:4px}.br15{border-radius:6px}.br20{border-radius:8px}.br25{border-radius:12px}.br30{border-radius:16px}.br35{border-radius:24px}.br40{border-radius:32px}.br45{border-radius:48px}.br50{border-radius:64px}.br55{border-radius:96px}.br60{border-radius:128px}.br65{border-radius:192px}.br70{border-radius:256px}.br75{border-radius:384px}.br80{border-radius:512px}.br85{border-radius:768px}.br90{border-radius:1024px}.br95{border-radius:1536px}.brP50{border-radius:50%}.brP{border-radius:100%}.brH{border-radius:100vh}.brW{border-radius:100vw}.brX{border-radius:11111111px}.mt0{margin-top:0}.mt1{margin-top:1px}.mt2{margin-top:2px}.mt3{margin-top:3px}.mt10{margin-top:4px}.mt15{margin-top:6px}.mt20{margin-top:8px}.mt25{margin-top:12px}.mt30{margin-top:16px}.mt35{margin-top:24px}.mt40{margin-top:32px}.mt45{margin-top:48px}.mt50{margin-top:64px}.mt55{margin-top:96px}.mt60{margin-top:128px}.mt65{margin-top:192px}.mt70{margin-top:256px}.mt75{margin-top:384px}.mt80{margin-top:512px}.mt85{margin-top:768px}.mt90{margin-top:1024px}.mt95{margin-top:1536px}.mtP50{margin-top:50%}.mtP{margin-top:100%}.mtH{margin-top:100vh}.mtW{margin-top:100vw}.mtX{margin-top:11111111px}.ml0{margin-left:0}.ml1{margin-left:1px}.ml2{margin-left:2px}.ml3{margin-left:3px}.ml10{margin-left:4px}.ml15{margin-left:6px}.ml20{margin-left:8px}.ml25{margin-left:12px}.ml30{margin-left:16px}.ml35{margin-left:24px}.ml40{margin-left:32px}.ml45{margin-left:48px}.ml50{margin-left:64px}.ml55{margin-left:96px}.ml60{margin-left:128px}.ml65{margin-left:192px}.ml70{margin-left:256px}.ml75{margin-left:384px}.ml80{margin-left:512px}.ml85{margin-left:768px}.ml90{margin-left:1024px}.ml95{margin-left:1536px}.mlP50{margin-left:50%}.mlP{margin-left:100%}.mlH{margin-left:100vh}.mlW{margin-left:100vw}.mlX{margin-left:11111111px}.mr0{margin-right:0}.mr1{margin-right:1px}.mr2{margin-right:2px}.mr3{margin-right:3px}.mr10{margin-right:4px}.mr15{margin-right:6px}.mr20{margin-right:8px}.mr25{margin-right:12px}.mr30{margin-right:16px}.mr35{margin-right:24px}.mr40{margin-right:32px}.mr45{margin-right:48px}.mr50{margin-right:64px}.mr55{margin-right:96px}.mr60{margin-right:128px}.mr65{margin-right:192px}.mr70{margin-right:256px}.mr75{margin-right:384px}.mr80{margin-right:512px}.mr85{margin-right:768px}.mr90{margin-right:1024px}.mr95{margin-right:1536px}.mrP50{margin-right:50%}.mrP{margin-right:100%}.mrH{margin-right:100vh}.mrW{margin-right:100vw}.mrX{margin-right:11111111px}.mb0{margin-bottom:0}.mb1{margin-bottom:1px}.mb2{margin-bottom:2px}.mb3{margin-bottom:3px}.mb10{margin-bottom:4px}.mb15{margin-bottom:6px}.mb20{margin-bottom:8px}.mb25{margin-bottom:12px}.mb30{margin-bottom:16px}.mb35{margin-bottom:24px}.mb40{margin-bottom:32px}.mb45{margin-bottom:48px}.mb50{margin-bottom:64px}.mb55{margin-bottom:96px}.mb60{margin-bottom:128px}.mb65{margin-bottom:192px}.mb70{margin-bottom:256px}.mb75{margin-bottom:384px}.mb80{margin-bottom:512px}.mb85{margin-bottom:768px}.mb90{margin-bottom:1024px}.mb95{margin-bottom:1536px}.mbP50{margin-bottom:50%}.mbP{margin-bottom:100%}.mbH{margin-bottom:100vh}.mbW{margin-bottom:100vw}.mbX{margin-bottom:11111111px}.pt0{padding-top:0}.pt1{padding-top:1px}.pt2{padding-top:2px}.pt3{padding-top:3px}.pt10{padding-top:4px}.pt15{padding-top:6px}.pt20{padding-top:8px}.pt25{padding-top:12px}.pt30{padding-top:16px}.pt35{padding-top:24px}.pt40{padding-top:32px}.pt45{padding-top:48px}.pt50{padding-top:64px}.pt55{padding-top:96px}.pt60{padding-top:128px}.pt65{padding-top:192px}.pt70{padding-top:256px}.pt75{padding-top:384px}.pt80{padding-top:512px}.pt85{padding-top:768px}.pt90{padding-top:1024px}.pt95{padding-top:1536px}.ptP50{padding-top:50%}.ptP{padding-top:100%}.ptH{padding-top:100vh}.ptW{padding-top:100vw}.ptX{padding-top:11111111px}.pl0{padding-left:0}.pl1{padding-left:1px}.pl2{padding-left:2px}.pl3{padding-left:3px}.pl10{padding-left:4px}.pl15{padding-left:6px}.pl20{padding-left:8px}.pl25{padding-left:12px}.pl30{padding-left:16px}.pl35{padding-left:24px}.pl40{padding-left:32px}.pl45{padding-left:48px}.pl50{padding-left:64px}.pl55{padding-left:96px}.pl60{padding-left:128px}.pl65{padding-left:192px}.pl70{padding-left:256px}.pl75{padding-left:384px}.pl80{padding-left:512px}.pl85{padding-left:768px}.pl90{padding-left:1024px}.pl95{padding-left:1536px}.plP50{padding-left:50%}.plP{padding-left:100%}.plH{padding-left:100vh}.plW{padding-left:100vw}.plX{padding-left:11111111px}.pr0{padding-right:0}.pr1{padding-right:1px}.pr2{padding-right:2px}.pr3{padding-right:3px}.pr10{padding-right:4px}.pr15{padding-right:6px}.pr20{padding-right:8px}.pr25{padding-right:12px}.pr30{padding-right:16px}.pr35{padding-right:24px}.pr40{padding-right:32px}.pr45{padding-right:48px}.pr50{padding-right:64px}.pr55{padding-right:96px}.pr60{padding-right:128px}.pr65{padding-right:192px}.pr70{padding-right:256px}.pr75{padding-right:384px}.pr80{padding-right:512px}.pr85{padding-right:768px}.pr90{padding-right:1024px}.pr95{padding-right:1536px}.prP50{padding-right:50%}.prP{padding-right:100%}.prH{padding-right:100vh}.prW{padding-right:100vw}.prX{padding-right:11111111px}.pb0{padding-bottom:0}.pb1{padding-bottom:1px}.pb2{padding-bottom:2px}.pb3{padding-bottom:3px}.pb10{padding-bottom:4px}.pb15{padding-bottom:6px}.pb20{padding-bottom:8px}.pb25{padding-bottom:12px}.pb30{padding-bottom:16px}.pb35{padding-bottom:24px}.pb40{padding-bottom:32px}.pb45{padding-bottom:48px}.pb50{padding-bottom:64px}.pb55{padding-bottom:96px}.pb60{padding-bottom:128px}.pb65{padding-bottom:192px}.pb70{padding-bottom:256px}.pb75{padding-bottom:384px}.pb80{padding-bottom:512px}.pb85{padding-bottom:768px}.pb90{padding-bottom:1024px}.pb95{padding-bottom:1536px}.pbP50{padding-bottom:50%}.pbP{padding-bottom:100%}.pbH{padding-bottom:100vh}.pbW{padding-bottom:100vw}.pbX{padding-bottom:11111111px}.mtN0{margin-top:-0}.mtN1{margin-top:-1px}.mtN2{margin-top:-2px}.mtN3{margin-top:-3px}.mtN10{margin-top:-4px}.mtN15{margin-top:-6px}.mtN20{margin-top:-8px}.mtN25{margin-top:-12px}.mtN30{margin-top:-16px}.mtN35{margin-top:-24px}.mtN40{margin-top:-32px}.mtN45{margin-top:-48px}.mtN50{margin-top:-64px}.mtN55{margin-top:-96px}.mtN60{margin-top:-128px}.mtN65{margin-top:-192px}.mtN70{margin-top:-256px}.mtN75{margin-top:-384px}.mtN80{margin-top:-512px}.mtN85{margin-top:-768px}.mtN90{margin-top:-1024px}.mtN95{margin-top:-1536px}.mtNP50{margin-top:-50%}.mtNP{margin-top:-100%}.mtNH{margin-top:-100vh}.mtNW{margin-top:-100vw}.mtNX{margin-top:-11111111px}.mlN0{margin-left:-0}.mlN1{margin-left:-1px}.mlN2{margin-left:-2px}.mlN3{margin-left:-3px}.mlN10{margin-left:-4px}.mlN15{margin-left:-6px}.mlN20{margin-left:-8px}.mlN25{margin-left:-12px}.mlN30{margin-left:-16px}.mlN35{margin-left:-24px}.mlN40{margin-left:-32px}.mlN45{margin-left:-48px}.mlN50{margin-left:-64px}.mlN55{margin-left:-96px}.mlN60{margin-left:-128px}.mlN65{margin-left:-192px}.mlN70{margin-left:-256px}.mlN75{margin-left:-384px}.mlN80{margin-left:-512px}.mlN85{margin-left:-768px}.mlN90{margin-left:-1024px}.mlN95{margin-left:-1536px}.mlNP50{margin-left:-50%}.mlNP{margin-left:-100%}.mlNH{margin-left:-100vh}.mlNW{margin-left:-100vw}.mlNX{margin-left:-11111111px}.mrN0{margin-right:-0}.mrN1{margin-right:-1px}.mrN2{margin-right:-2px}.mrN3{margin-right:-3px}.mrN10{margin-right:-4px}.mrN15{margin-right:-6px}.mrN20{margin-right:-8px}.mrN25{margin-right:-12px}.mrN30{margin-right:-16px}.mrN35{margin-right:-24px}.mrN40{margin-right:-32px}.mrN45{margin-right:-48px}.mrN50{margin-right:-64px}.mrN55{margin-right:-96px}.mrN60{margin-right:-128px}.mrN65{margin-right:-192px}.mrN70{margin-right:-256px}.mrN75{margin-right:-384px}.mrN80{margin-right:-512px}.mrN85{margin-right:-768px}.mrN90{margin-right:-1024px}.mrN95{margin-right:-1536px}.mrNP50{margin-right:-50%}.mrNP{margin-right:-100%}.mrNH{margin-right:-100vh}.mrNW{margin-right:-100vw}.mrNX{margin-right:-11111111px}.mbN0{margin-bottom:-0}.mbN1{margin-bottom:-1px}.mbN2{margin-bottom:-2px}.mbN3{margin-bottom:-3px}.mbN10{margin-bottom:-4px}.mbN15{margin-bottom:-6px}.mbN20{margin-bottom:-8px}.mbN25{margin-bottom:-12px}.mbN30{margin-bottom:-16px}.mbN35{margin-bottom:-24px}.mbN40{margin-bottom:-32px}.mbN45{margin-bottom:-48px}.mbN50{margin-bottom:-64px}.mbN55{margin-bottom:-96px}.mbN60{margin-bottom:-128px}.mbN65{margin-bottom:-192px}.mbN70{margin-bottom:-256px}.mbN75{margin-bottom:-384px}.mbN80{margin-bottom:-512px}.mbN85{margin-bottom:-768px}.mbN90{margin-bottom:-1024px}.mbN95{margin-bottom:-1536px}.mbNP50{margin-bottom:-50%}.mbNP{margin-bottom:-100%}.mbNH{margin-bottom:-100vh}.mbNW{margin-bottom:-100vw}.mbNX{margin-bottom:-11111111px}.fwN{font-weight:400}.fwM{font-weight:600}.fwB{font-weight:700}.wsC{white-space:nowrap}.wsCW{white-space:normal}.wsP{white-space:pre}.wsPW{white-space:pre-wrap}.bgpLT{background-position:left top}.bgpLB{background-position:left bottom}.bgpLC{background-position:left center}.bgpRT{background-position:right top}.bgpRB{background-position:right bottom}.bgpRC{background-position:right center}.bgpCT{background-position:center top}.bgpCB{background-position:center bottom}.bgpCC{background-position:center center}.bgsCV{background-size:cover}.bgsCT{background-size:contain}.btw0{border-top-width:0}.btw1{border-top-width:1px}.btw2{border-top-width:2px}.btw3{border-top-width:3px}.btw10{border-top-width:4px}.btw15{border-top-width:6px}.btw20{border-top-width:8px}.btw25{border-top-width:12px}.btw30{border-top-width:16px}.btw35{border-top-width:24px}.btw40{border-top-width:32px}.btw45{border-top-width:48px}.btw50{border-top-width:64px}.btw55{border-top-width:96px}.btw60{border-top-width:128px}.btw65{border-top-width:192px}.btw70{border-top-width:256px}.btw75{border-top-width:384px}.btw80{border-top-width:512px}.btw85{border-top-width:768px}.btw90{border-top-width:1024px}.btw95{border-top-width:1536px}.btwP50{border-top-width:50%}.btwP{border-top-width:100%}.btwH{border-top-width:100vh}.btwW{border-top-width:100vw}.btwX{border-top-width:11111111px}.blw0{border-left-width:0}.blw1{border-left-width:1px}.blw2{border-left-width:2px}.blw3{border-left-width:3px}.blw10{border-left-width:4px}.blw15{border-left-width:6px}.blw20{border-left-width:8px}.blw25{border-left-width:12px}.blw30{border-left-width:16px}.blw35{border-left-width:24px}.blw40{border-left-width:32px}.blw45{border-left-width:48px}.blw50{border-left-width:64px}.blw55{border-left-width:96px}.blw60{border-left-width:128px}.blw65{border-left-width:192px}.blw70{border-left-width:256px}.blw75{border-left-width:384px}.blw80{border-left-width:512px}.blw85{border-left-width:768px}.blw90{border-left-width:1024px}.blw95{border-left-width:1536px}.blwP50{border-left-width:50%}.blwP{border-left-width:100%}.blwH{border-left-width:100vh}.blwW{border-left-width:100vw}.blwX{border-left-width:11111111px}.brw0{border-right-width:0}.brw1{border-right-width:1px}.brw2{border-right-width:2px}.brw3{border-right-width:3px}.brw10{border-right-width:4px}.brw15{border-right-width:6px}.brw20{border-right-width:8px}.brw25{border-right-width:12px}.brw30{border-right-width:16px}.brw35{border-right-width:24px}.brw40{border-right-width:32px}.brw45{border-right-width:48px}.brw50{border-right-width:64px}.brw55{border-right-width:96px}.brw60{border-right-width:128px}.brw65{border-right-width:192px}.brw70{border-right-width:256px}.brw75{border-right-width:384px}.brw80{border-right-width:512px}.brw85{border-right-width:768px}.brw90{border-right-width:1024px}.brw95{border-right-width:1536px}.brwP50{border-right-width:50%}.brwP{border-right-width:100%}.brwH{border-right-width:100vh}.brwW{border-right-width:100vw}.brwX{border-right-width:11111111px}.bbw0{border-bottom-width:0}.bbw1{border-bottom-width:1px}.bbw2{border-bottom-width:2px}.bbw3{border-bottom-width:3px}.bbw10{border-bottom-width:4px}.bbw15{border-bottom-width:6px}.bbw20{border-bottom-width:8px}.bbw25{border-bottom-width:12px}.bbw30{border-bottom-width:16px}.bbw35{border-bottom-width:24px}.bbw40{border-bottom-width:32px}.bbw45{border-bottom-width:48px}.bbw50{border-bottom-width:64px}.bbw55{border-bottom-width:96px}.bbw60{border-bottom-width:128px}.bbw65{border-bottom-width:192px}.bbw70{border-bottom-width:256px}.bbw75{border-bottom-width:384px}.bbw80{border-bottom-width:512px}.bbw85{border-bottom-width:768px}.bbw90{border-bottom-width:1024px}.bbw95{border-bottom-width:1536px}.bbwP50{border-bottom-width:50%}.bbwP{border-bottom-width:100%}.bbwH{border-bottom-width:100vh}.bbwW{border-bottom-width:100vw}.bbwX{border-bottom-width:11111111px}.btcW{border-top-color:white}.btcB{border-top-color:black}.btcTR{border-top-color:transparent}.btcG98{border-top-color:hsl(0,0%,98%)}.btcG94{border-top-color:hsl(0,0%,94%)}.btcG88{border-top-color:hsl(0,0%,88%)}.btcG80{border-top-color:hsl(0,0%,80%)}.btcG30{border-top-color:hsl(0,0%,30%)}.btcG20{border-top-color:hsl(0,0%,20%)}.btcG10{border-top-color:hsl(0,0%,10%)}.btcB05{border-top-color:hsla(0,0%,0%,05%)}.btcB10{border-top-color:hsla(0,0%,0%,10%)}.btcB20{border-top-color:hsla(0,0%,0%,20%)}.btcB40{border-top-color:hsla(0,0%,0%,40%)}.btcB80{border-top-color:hsla(0,0%,0%,80%)}.btcW05{border-top-color:hsla(0,0%,100%,05%)}.btcW10{border-top-color:hsla(0,0%,100%,10%)}.btcW20{border-top-color:hsla(0,0%,100%,20%)}.btcW40{border-top-color:hsla(0,0%,100%,40%)}.btcW80{border-top-color:hsla(0,0%,100%,80%)}.btcPRIMARY{border-top-color:#8d1d90}.btcALTPRIMARY{border-top-color:#9d3ea0}.btcSECONDARY{border-top-color:#b7de58}.btcALTSECONDARY{border-top-color:#c1e270}.btcGOOD{border-top-color:#3bb273}.btcLIGHTGOOD{border-top-color:#ebf7f1}.btcWARN{border-top-color:#e1bc29}.btcLIGHTWARN{border-top-color:#fcf8e9}.btcBAD{border-top-color:#e15554}.btcLIGHTBAD{border-top-color:#fceeed}.btcMSG{border-top-color:#3d70b2}.btcLIGHTMSG{border-top-color:#ebf0f7}.blcW{border-left-color:white}.blcB{border-left-color:black}.blcTR{border-left-color:transparent}.blcG98{border-left-color:hsl(0,0%,98%)}.blcG94{border-left-color:hsl(0,0%,94%)}.blcG88{border-left-color:hsl(0,0%,88%)}.blcG80{border-left-color:hsl(0,0%,80%)}.blcG30{border-left-color:hsl(0,0%,30%)}.blcG20{border-left-color:hsl(0,0%,20%)}.blcG10{border-left-color:hsl(0,0%,10%)}.blcB05{border-left-color:hsla(0,0%,0%,05%)}.blcB10{border-left-color:hsla(0,0%,0%,10%)}.blcB20{border-left-color:hsla(0,0%,0%,20%)}.blcB40{border-left-color:hsla(0,0%,0%,40%)}.blcB80{border-left-color:hsla(0,0%,0%,80%)}.blcW05{border-left-color:hsla(0,0%,100%,05%)}.blcW10{border-left-color:hsla(0,0%,100%,10%)}.blcW20{border-left-color:hsla(0,0%,100%,20%)}.blcW40{border-left-color:hsla(0,0%,100%,40%)}.blcW80{border-left-color:hsla(0,0%,100%,80%)}.blcPRIMARY{border-left-color:#8d1d90}.blcALTPRIMARY{border-left-color:#9d3ea0}.blcSECONDARY{border-left-color:#b7de58}.blcALTSECONDARY{border-left-color:#c1e270}.blcGOOD{border-left-color:#3bb273}.blcLIGHTGOOD{border-left-color:#ebf7f1}.blcWARN{border-left-color:#e1bc29}.blcLIGHTWARN{border-left-color:#fcf8e9}.blcBAD{border-left-color:#e15554}.blcLIGHTBAD{border-left-color:#fceeed}.blcMSG{border-left-color:#3d70b2}.blcLIGHTMSG{border-left-color:#ebf0f7}.brcW{border-right-color:white}.brcB{border-right-color:black}.brcTR{border-right-color:transparent}.brcG98{border-right-color:hsl(0,0%,98%)}.brcG94{border-right-color:hsl(0,0%,94%)}.brcG88{border-right-color:hsl(0,0%,88%)}.brcG80{border-right-color:hsl(0,0%,80%)}.brcG30{border-right-color:hsl(0,0%,30%)}.brcG20{border-right-color:hsl(0,0%,20%)}.brcG10{border-right-color:hsl(0,0%,10%)}.brcB05{border-right-color:hsla(0,0%,0%,05%)}.brcB10{border-right-color:hsla(0,0%,0%,10%)}.brcB20{border-right-color:hsla(0,0%,0%,20%)}.brcB40{border-right-color:hsla(0,0%,0%,40%)}.brcB80{border-right-color:hsla(0,0%,0%,80%)}.brcW05{border-right-color:hsla(0,0%,100%,05%)}.brcW10{border-right-color:hsla(0,0%,100%,10%)}.brcW20{border-right-color:hsla(0,0%,100%,20%)}.brcW40{border-right-color:hsla(0,0%,100%,40%)}.brcW80{border-right-color:hsla(0,0%,100%,80%)}.brcPRIMARY{border-right-color:#8d1d90}.brcALTPRIMARY{border-right-color:#9d3ea0}.brcSECONDARY{border-right-color:#b7de58}.brcALTSECONDARY{border-right-color:#c1e270}.brcGOOD{border-right-color:#3bb273}.brcLIGHTGOOD{border-right-color:#ebf7f1}.brcWARN{border-right-color:#e1bc29}.brcLIGHTWARN{border-right-color:#fcf8e9}.brcBAD{border-right-color:#e15554}.brcLIGHTBAD{border-right-color:#fceeed}.brcMSG{border-right-color:#3d70b2}.brcLIGHTMSG{border-right-color:#ebf0f7}.bbcW{border-bottom-color:white}.bbcB{border-bottom-color:black}.bbcTR{border-bottom-color:transparent}.bbcG98{border-bottom-color:hsl(0,0%,98%)}.bbcG94{border-bottom-color:hsl(0,0%,94%)}.bbcG88{border-bottom-color:hsl(0,0%,88%)}.bbcG80{border-bottom-color:hsl(0,0%,80%)}.bbcG30{border-bottom-color:hsl(0,0%,30%)}.bbcG20{border-bottom-color:hsl(0,0%,20%)}.bbcG10{border-bottom-color:hsl(0,0%,10%)}.bbcB05{border-bottom-color:hsla(0,0%,0%,05%)}.bbcB10{border-bottom-color:hsla(0,0%,0%,10%)}.bbcB20{border-bottom-color:hsla(0,0%,0%,20%)}.bbcB40{border-bottom-color:hsla(0,0%,0%,40%)}.bbcB80{border-bottom-color:hsla(0,0%,0%,80%)}.bbcW05{border-bottom-color:hsla(0,0%,100%,05%)}.bbcW10{border-bottom-color:hsla(0,0%,100%,10%)}.bbcW20{border-bottom-color:hsla(0,0%,100%,20%)}.bbcW40{border-bottom-color:hsla(0,0%,100%,40%)}.bbcW80{border-bottom-color:hsla(0,0%,100%,80%)}.bbcPRIMARY{border-bottom-color:#8d1d90}.bbcALTPRIMARY{border-bottom-color:#9d3ea0}.bbcSECONDARY{border-bottom-color:#b7de58}.bbcALTSECONDARY{border-bottom-color:#c1e270}.bbcGOOD{border-bottom-color:#3bb273}.bbcLIGHTGOOD{border-bottom-color:#ebf7f1}.bbcWARN{border-bottom-color:#e1bc29}.bbcLIGHTWARN{border-bottom-color:#fcf8e9}.bbcBAD{border-bottom-color:#e15554}.bbcLIGHTBAD{border-bottom-color:#fceeed}.bbcMSG{border-bottom-color:#3d70b2}.bbcLIGHTMSG{border-bottom-color:#ebf0f7}.fx000{flex:0 0 0%}.fx00A{flex:0 0 auto}.fx00P{flex:0 0 100%}.fx010{flex:0 1 0%}.fx01A{flex:0 1 auto}.fx01P{flex:0 1 100%}.fx020{flex:0 2 0%}.fx02A{flex:0 2 auto}.fx02P{flex:0 2 100%}.fx0X0{flex:0 11111111 0%}.fx0XA{flex:0 11111111 auto}.fx0XP{flex:0 11111111 100%}.fx100{flex:1 0 0%}.fx10A{flex:1 0 auto}.fx10P{flex:1 0 100%}.fx110{flex:1 1 0%}.fx11A{flex:1 1 auto}.fx11P{flex:1 1 100%}.fx120{flex:1 2 0%}.fx12A{flex:1 2 auto}.fx12P{flex:1 2 100%}.fx1X0{flex:1 11111111 0%}.fx1XA{flex:1 11111111 auto}.fx1XP{flex:1 11111111 100%}.fx200{flex:2 0 0%}.fx20A{flex:2 0 auto}.fx20P{flex:2 0 100%}.fx210{flex:2 1 0%}.fx21A{flex:2 1 auto}.fx21P{flex:2 1 100%}.fx220{flex:2 2 0%}.fx22A{flex:2 2 auto}.fx22P{flex:2 2 100%}.fx2X0{flex:2 11111111 0%}.fx2XA{flex:2 11111111 auto}.fx2XP{flex:2 11111111 100%}.fxX00{flex:11111111 0 0%}.fxX0A{flex:11111111 0 auto}.fxX0P{flex:11111111 0 100%}.fxX10{flex:11111111 1 0%}.fxX1A{flex:11111111 1 auto}.fxX1P{flex:11111111 1 100%}.fxX20{flex:11111111 2 0%}.fxX2A{flex:11111111 2 auto}.fxX2P{flex:11111111 2 100%}.fxXX0{flex:11111111 11111111 0%}.fxXXA{flex:11111111 11111111 auto}.fxXXP{flex:11111111 11111111 100%}.fxdR{flex-direction:row}.fxdC{flex-direction:column}.fxdRR{flex-direction:row-reverse}.fxdCR{flex-direction:column-reverse}.aiFS{align-items:flex-start}.aiFE{align-items:flex-end}.aiC{align-items:center}.aiB{align-items:baseline}.aiS{align-items:stretch}.asFS{align-self:flex-start}.asFE{align-self:flex-end}.asC{align-self:center}.asB{align-self:baseline}.asS{align-self:stretch}.acFS{align-content:flex-start}.acFE{align-content:flex-end}.acC{align-content:center}.acB{align-content:baseline}.acS{align-content:stretch}.jcFS{justify-content:flex-start}.jcFE{justify-content:flex-end}.jcC{justify-content:center}.jcSB{justify-content:space-between}.jcSE{justify-content:space-evenly}.ovHH{overflow:hidden hidden}.ovHS{overflow:hidden scroll}.ovHA{overflow:hidden auto}.ovHV{overflow:hidden visible}.ovSH{overflow:scroll hidden}.ovSS{overflow:scroll scroll}.ovSA{overflow:scroll auto}.ovSV{overflow:scroll visible}.ovAH{overflow:auto hidden}.ovAS{overflow:auto scroll}.ovAA{overflow:auto auto}.ovAV{overflow:auto visible}.ovVH{overflow:visible hidden}.ovVS{overflow:visible scroll}.ovVA{overflow:visible auto}.ovVV{overflow:visible visible}.o0{opacity:0}.o10{opacity:10}.o20{opacity:20}.o40{opacity:40}.o80{opacity:80}.o100{opacity:100}.tdL{text-decoration:line-through}.tdU{text-decoration:underline}.tdN{text-decoration:none}.fstI{font-style:italic}.fstN{font-style:normal}.ttU{text-transform:uppercase}.ttL{text-transform:lowercase}.ovwB{overflow-wrap:break-word}.ovwA{overflow-wrap:anywhere}.ovwN{overflow-wrap:normal}.bgrR{background-repeat:repeat}.bgrN{background-repeat:no-repeat}.pR{position:relative}.pA{position:absolute}.pF{position:fixed}.pS{position:sticky}.taL{text-align:left}.taC{text-align:center}.taR{text-align:right}.taJ{text-align:justify}.vaT{vertical-align:top}.vaM{vertical-align:middle}.vaB{vertical-align:bottom}.cuD{cursor:default}.cuP{cursor:pointer}.peN{pointer-events:none}.peA{pointer-events:all}`;

fetch('https://raw.githubusercontent.com/Dogfalo/materialize/v1-dev/dist/css/materialize.min.css')
  .then(response => response.text())
  .then(css => {
    let count = 0;
    csstree.walk(csstree.parse(css), {
      visit: 'Rule',
      enter: () => count++
    });
    console.log(count);
  });


