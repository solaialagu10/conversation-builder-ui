import React, { useState } from 'react'; 
import * as go from 'gojs';
import { ReactDiagram, ReactPalette } from 'gojs-react';
import '../styles.css';
const DiagramComponent = () => {
	const [nodeArray, setNodeArray] = useState([]);
	const [linkArray, setLinkArray] = useState([]);

	const showLinkLabel = (e) => {
		const label = e.subject.findObject('LABEL');
		if (label !== null)
			label.visible = e.subject.fromNode.data.category === 'Conditional';
	};

	const $ = go.GraphObject.make;
	const diagram = $(go.Diagram, {
		'undoManager.isEnabled': true,
		LinkDrawn: showLinkLabel,
		LinkRelinked: showLinkLabel,
		model: $(go.GraphLinksModel, {
			linkKeyProperty: 'key'
		})
	});

	const initDiagram = () => {
		diagram.licenseKey = "";
		diagram.nodeTemplate = $(
			go.Node,
			'Auto',
			{ selectionAdorned: false },
			new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(
				go.Point.stringify
			),
			$(
				go.Shape,
				'RoundedRectangle',
				{ name: 'SHAPE', fill: 'lightgreen', strokeWidth: 1 },
				new go.Binding('fill', 'color')
			),
			$(
				go.TextBlock,
				{ margin: 8, editable: true },
				new go.Binding('text').makeTwoWay()
			)
		);

		diagram.addDiagramListener('Modified', (e) => {
			const button = document.getElementById('SaveButton');
			if (button) button.disabled = !diagram.isModified;
			const idx = document.title.indexOf('*');
			if (diagram.isModified) {
				if (idx < 0) document.title += '*';
			} else if (idx >= 0) document.title = document.title.substr(0, idx);
		});

		const nodeStyle = () => [
			new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(
				go.Point.stringify
			),
			{
				locationSpot: go.Spot.Center
			}
		];
		const makePort = (name, align, spot, output, input) => {
			const horizontal =
				align.equals(go.Spot.Top) || align.equals(go.Spot.Bottom);
				console.log("Horizontal "+horizontal);
				console.log("align "+align);
			return $(go.Shape,{				
				fill: 'transparent',
				strokeWidth: 0,
				width: horizontal ? NaN : 1,
				height: !horizontal ? NaN : 1,
				alignment: align,
				stretch: horizontal
					? go.GraphObject.Horizontal
					: go.GraphObject.Vertical,
				portId: name,
				fromSpot: spot,
				fromLinkable: output,
				toSpot: spot,
				toLinkable: input,
				cursor: 'pointer',
				mouseEnter(e, port) {
					if (!e.diagram.isReadOnly) port.fill = 'transparent';
				},
				mouseLeave(e, port) {
					port.fill = 'transparent';
				}
			});
		};

		const textStyle = () => ({
			font: 'bold 14px Lato, Helvetica, Arial, sans-serif',
			stroke: '#000000'
		});

		diagram.nodeTemplateMap.add(
			'',
			$(
				go.Node,
				'Table',
				{ selectionAdorned: false },
				nodeStyle(),
				$(
					go.Panel,
					'Auto',
					$(
						go.Shape,
						'Rectangle',
						{ fill: '#d3d3d3',
						stroke: '#a9a9a9',
						strokeWidth: 1},
						new go.Binding('figure', 'figure')
					),
					$(
						go.TextBlock,
						textStyle(),
						{
							margin: 30,
							maxSize: new go.Size(300, NaN),
							wrap: go.TextBlock.WrapFit,
							editable: true
						},
						new go.Binding('text').makeTwoWay()
					)
				),
				makePort('T', go.Spot.Top, go.Spot.TopSide, false, true),
				makePort('L', go.Spot.Left, go.Spot.LeftSide, true, true),
				makePort('R', go.Spot.Right, go.Spot.RightSide, true, true),
				makePort('B', go.Spot.Bottom, go.Spot.BottomSide, true, false)
			)
		);

		diagram.nodeTemplateMap.add(
			'Conditional',
			$(
				go.Node,
				'Table',
   				{ selectionAdorned: false },
				nodeStyle(),
				$(
					go.Panel,
					'Auto',
					$(
						go.Shape,
						'Diamond',
						{ fill: '#d3d3d3',
						stroke: '#a9a9a9',
						strokeWidth: 1 },
						new go.Binding('figure', 'figure')
					),
					$(
						go.TextBlock,
						textStyle(),
						{
							margin: 8,
							maxSize: new go.Size(200, NaN),
							wrap: go.TextBlock.WrapFit,
							editable: true
						},
						new go.Binding('text').makeTwoWay()
					)
				),
				makePort('T', go.Spot.Top, go.Spot.Top, false, true),
				makePort('L', go.Spot.Left, go.Spot.Left, true, true),
				makePort('R', go.Spot.Right, go.Spot.Right, true, true),
				makePort('B', go.Spot.Bottom, go.Spot.Bottom, true, false)
			)
		);

		diagram.nodeTemplateMap.add(
			'Start',
			$(
				go.Node,
				"Auto",
    			{ selectionAdorned: false },
				'Table',
				nodeStyle(),
				$(
					go.Panel,
					'Spot',
					$(go.Shape, 'Circle', {
						desiredSize: new go.Size(70, 70),
						fill: '#d3d3d3',
						stroke: '#a9a9a9',
						strokeWidth: 1
					}),
					$(go.TextBlock, 'Start', textStyle(), new go.Binding('text'))
				),
				// makePort('L', go.Spot.Left, go.Spot.Left, true, false),
				makePort('R', go.Spot.Right, go.Spot.Right, true, false),
				// makePort('B', go.Spot.Bottom, go.Spot.Bottom, true, false)
			)
		);

		diagram.nodeTemplateMap.add(
			'End',
			$(
				go.Node,
				'Table',	
    			{ selectionAdorned: false },
				nodeStyle(),
				$(
					go.Panel,
					'Spot',
					$(go.Shape, 'Circle', {
						desiredSize: new go.Size(60, 60),
						fill: '#d3d3d3',
						stroke: '#a9a9a9',
						strokeWidth: 1
					}),
					$(go.TextBlock, 'End', textStyle(), new go.Binding('text'))
				),
				// makePort('T', go.Spot.Top, go.Spot.Top, false, true),
				makePort('L', go.Spot.Left, go.Spot.Left, false, true),
				// makePort('R', go.Spot.Right, go.Spot.Right, false, true)
			)
		);

		go.Shape.defineFigureGenerator('File', (shape, w, h) => {
			const geo = new go.Geometry();
			const fig = new go.PathFigure(0, 0, true);
			geo.add(fig);
			fig.add(new go.PathSegment(go.PathSegment.Line, 0.75 * w, 0));
			fig.add(new go.PathSegment(go.PathSegment.Line, w, 0.25 * h));
			fig.add(new go.PathSegment(go.PathSegment.Line, w, h));
			fig.add(new go.PathSegment(go.PathSegment.Line, 0, h).close());
			const fig2 = new go.PathFigure(0.75 * w, 0, false);
			geo.add(fig2);
			fig2.add(new go.PathSegment(go.PathSegment.Line, 0.75 * w, 0.25 * h));
			fig2.add(new go.PathSegment(go.PathSegment.Line, w, 0.25 * h));
			geo.spot1 = new go.Spot(0, 0.25);
			geo.spot2 = go.Spot.BottomRight;
			return geo;
		});

		diagram.nodeTemplateMap.add(
			'Comment',
			$(
				go.Node,
				'Auto',
    			{ selectionAdorned: false },
				nodeStyle(),
				$(go.Shape, 'RoundedRectangle', {
					fill: '#d3d3d3',
						stroke: '#a9a9a9',
						strokeWidth: 1
				}),
				$(
					go.TextBlock,
					textStyle(),
					{
						margin:8,
						maxSize: new go.Size(240, NaN),
						wrap: go.TextBlock.WrapFit,
						textAlign: 'center',
						editable: true
					},
					new go.Binding('text').makeTwoWay()
				),
				makePort('L', go.Spot.Left, go.Spot.Left, true, true),
				makePort('R', go.Spot.Right, go.Spot.Right, true, true),
				makePort('B', go.Spot.Bottom, go.Spot.Bottom, true, false)
			)
		);

		// 连接线处理
		diagram.linkTemplate = $(
			go.Link,
			{
				routing: go.Link.AvoidsNodes,
				curve: go.Link.JumpOver,
				corner: 2,
				toShortLength: 4,
				relinkableFrom: true,
				relinkableTo: true,
				reshapable: true,
				resegmentable: true,
				mouseEnter(e, link) {
					link.findObject('HIGHLIGHT').stroke = 'transparent';
				},
				mouseLeave(e, link) {
					link.findObject('HIGHLIGHT').stroke = 'transparent';
				},
				selectionAdorned: false
			},
			new go.Binding('points').makeTwoWay(),
			$(go.Shape, {
				isPanelMain: true,
				strokeWidth: 8,
				stroke: 'transparent',
				name: 'HIGHLIGHT'
			}),
			$(
				go.Shape,
				{ isPanelMain: true, stroke: 'gray', strokeWidth: 2 },
				new go.Binding('stroke', 'isSelected', (sel) =>
					sel ? 'dodgerblue' : 'gray'
				).ofObject()
			),
			$(go.Shape, { toArrow: 'standard', strokeWidth: 0, fill: 'gray' }),
			$(
				go.Panel,
				'Auto',
				{
					visible: false,
					name: 'LABEL',
					segmentIndex: 2,
					segmentFraction: 0.5
				},
				new go.Binding('visible', 'visible').makeTwoWay(),
				$(go.Shape, 'RoundedRectangle', { fill: '#F8F8F8', strokeWidth: 0 }),
				$(
					go.TextBlock,
					'Yes',
					{
						textAlign: 'center',
						font: '10pt helvetica, arial, sans-serif',
						stroke: '#333333',
						editable: true
					},
					new go.Binding('text').makeTwoWay()
				)
			)
		);

		diagram.toolManager.linkingTool.temporaryLink.routing = go.Link.Orthogonal;
		diagram.toolManager.relinkingTool.temporaryLink.routing =
			go.Link.Orthogonal;

		return diagram;
	};

	const initPalette = () => {

		const animateFadeDown = (e) => {
			const animation = new go.Animation();
			animation.isViewportUnconstrained = true;
			animation.easing = go.Animation.EaseOutExpo;
			animation.duration = 900;
			animation.add(
				e.diagram,
				'position',
				e.diagram.position.copy().offset(0, 200),
				e.diagram.position
			);
			animation.add(e.diagram, 'opacity', 0, 1);
			animation.start();
		};

		const myPalette = $(go.Palette, {
			'animationManager.initialAnimationStyle': go.AnimationManager.None,
			InitialAnimationStarting: animateFadeDown,
			nodeTemplateMap: diagram.nodeTemplateMap
		});

		myPalette.nodeTemplate = $(go.Node, "Auto",
			{ selectionAdorned: false },
			'Horizontal',
			$(go.Shape, { fill: 'red' }, new go.Binding('fill', 'color')),
			$(go.TextBlock,{ stroke: 'red' },  new go.Binding('text').makeTwoWay()),
			{
				selectionAdornmentTemplate:
				  $(go.Adornment, "Auto",
					$(go.Shape, "RoundedRectangle",
					{ fill: null, stroke: "red", strokeWidth: 8 }),
					$(go.Placeholder)
				  )  // end Adornment
			  }
		);

		return myPalette;
	};
  const handleSubmit =() =>{
	  console.log("<><><> "+diagram.model.toJson());
	document.getElementById("mySavedModel").value = diagram.model.toJson();
  }
	const handleModelChange = (obj)  => {
		console.log('changes: ', obj)
		  const insertedNodeKeys = obj.insertedNodeKeys;
		  const modifiedNodeData = obj.modifiedNodeData;
		 
		  const modifiedNodeMap  = new Map;
		  let narr = nodeArray;
		//   console.log("<><> "+JSON.stringify(modelAsText));
		  if(modifiedNodeData){
			modifiedNodeData.forEach((nd) => {
				// modifiedNodeMap.set(nd.key, nd);		
				if(nd.category === 'Start'){		
					let obj = narr.filter(
						function(data){ return data.category == nd.category }
					);
					if(obj.length === 0 ){
						narr.push(nd);	
					}		
				}			
				else{
					narr.push(nd);	
				}
						
				setNodeArray(narr);			
			});
		  }
		if (insertedNodeKeys) {
			insertedNodeKeys.forEach((key) => {
				console.log("<><><< "+key);
			  const nd = modifiedNodeMap.get(key);
			//   const idx = this.mapNodeKeyIdx.get(key);
			//   if (nd && idx === undefined) {  // nodes won't be added if they already exist
			// 	this.mapNodeKeyIdx.set(nd.key, narr.length);
			// 	narr.push(nd);
			//   }
			});
		  }
	};

	return (
		<div>
					<div className="wrapper1">
						<ReactPalette
							initPalette={initPalette}
							divClassName="palette-component"
							nodeDataArray={[
								{ category: 'Start', text: 'Start' },
								{ text: 'Intent' },
								{ category: 'Conditional', text: 'Condition' },
								{ category: 'End', text: 'End' },
								{ category: 'Comment', text: 'Response Text' }
							]}
						/>
						</div>
						<div className="wrapper2">
						<ReactDiagram
							initDiagram={initDiagram}
							divClassName="diagram-component"
							linkFromPortIdProperty="fromPort"
							linkToPortIdProperty="toPort"
							nodeDataArray={nodeArray}
							linkDataArray={linkArray}
							onModelChange={handleModelChange}
							skipsDiagramUpdate={true}
						/>
						</div>
		</div>
	);
};

export default DiagramComponent;