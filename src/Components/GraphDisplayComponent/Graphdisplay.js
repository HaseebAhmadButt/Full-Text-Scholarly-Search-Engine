// import React, { useEffect } from 'react';
// import ForceGraph3D from '3d-force-graph';
// export function GraphDisplay() {
//     useEffect(() => {
//         const data = {
//             nodes: [
//                 { id: 'A', name: 'Node A', url: 'https://www.google.com' },
//                 { id: 'B', name: 'Node B', url: 'https://www.facebook.com' },
//                 { id: 'C', name: 'Node C', url: 'https://www.twitter.com' },
//             ],
//             links: [
//                 { source: 'A', target: 'B' },ss
//                 { source: 'B', target: 'C' },
//                 { source: 'C', target: 'A' },
//             ],
//         };
//
//         const Graph = ForceGraph3D()(document.getElementById('3d-graph'))
//             .graphData(data)
//             .onNodeClick((node) => {
//                 window.open(node.url, '_blank');
//             });
//         Graph.d3Force('charge').strength(-120);
//         }, []);
//
//     return <div id="3d-graph"
//                 style={{
//                     position: 'absolute',
//                     top: '50%',
//                     left: '50%',
//                     transform: 'translate(-50%, -50%)',
//                     width: '100vw',
//                     height: '100vh',
//                 }}
//     ></div>;
// }
//
//
import React, { useEffect } from 'react';
import ForceGraph3D from '3d-force-graph';
import SpriteText from "three-spritetext"

export function GraphDisplay({data}) {
    console.log(data)
    useEffect(() => {

        ForceGraph3D()(document.getElementById('3d-graph'))
            .graphData(data)
            .nodeThreeObject((node) => {
                const sprite = new SpriteText(node.name);
                sprite.color = 'white';
                sprite.textHeight = 8;
                return sprite;
            }).onNodeDragEnd(node => {
            node.fx = node.x;
            node.fy = node.y;
            node.fz = node.z;
        }).onNodeClick((node) => {
                window.open(`/singlePaper/${encodeURIComponent(node.id)}`, '_blank');
            }).linkDirectionalArrowLength(3.5)
            .linkDirectionalArrowRelPos(1);
    }, [data]);

    return <div id="3d-graph" style={{ width: '100%', height: '100vh' }}></div>;
}
