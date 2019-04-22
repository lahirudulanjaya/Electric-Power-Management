import React, {Component} from 'react'
import GoJs from "../GoJs/GoJs";

class path extends Component{

    constructor(props){
        super(props)
        this.state = {
            faultSwitch: this.props.faultSwitch,
            graph: this.props.graph,
            showPath: false,
            paths: [],
            faultEdges: [],
            nodeDataArray: [
                { key: 5, text: "248\nSwitch\nClosed","loc": "-200 0"},
                { key: 6, text: "249\nSwitch\nClosed"}
            ],
            linkDataArray: [
                { "from": 5, "to": 6, "text": "Capacity" }
            ],
        }
    }

    componentWillMount() {
        console.log("[Path.js componentWillMount]")
        this.setState({
            faultSwitch: this.props.faultSwitch,
            graph: this.props.graph,
            showPath: false,
        })
        console.log(this.state)
    }

    componentWillReceiveProps(nextProps, nextContext) {
        console.log("[Path.js componentWillReceiveProps]")
        if(nextProps.graph!==this.props.graph){
            this.setState({
                faultSwitch: nextProps.faultSwitch,
                graph: nextProps.graph,
                showPath: false,
            })
        }
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        if(nextProps.graph!==this.props.graph){
            console.log("[Path.js componentWillUpdate]")
            this.setState({
                faultSwitch: nextProps.faultSwitch,
                graph: nextProps.graph,
                showPath: false,
            })
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("[Path.js componentDidUpdate]")
    }

    findPaths(){
        let faultEdges = this.state.graph.findFaultEdge(this.state.faultSwitch)
        let from = this.state.graph.getVertex(this.state.faultSwitch)
        let to = faultEdges[1]
        let paths = this.state.graph.findPaths(from,to)
        this.setState({
            faultEdges: faultEdges,
            paths: paths,
            showPath: true
        })
    }

    recoveryClickHandler = () => {
        try{
            this.findPaths()
        }catch (e) {
            console.log("error: "+e)
            alert("No recovery paths detected")
        }
    }

    render() {
        console.log("[Path.js render]")
        return (
            <div className="bg-default" style={{margin: "0 0 5px 0", borderRadius: "10px"}}>
                {
                    (this.state.showPath)
                        ? <div>
                            {/*<GoJs nodes={this.state.nodeDataArray} links={this.state.linkDataArray}/>*/}
                            <input
                                className="btn btn-primary"
                                type="submit"
                                value="Find Recovery Path"
                                style={{padding: "9px",width: "90%"}}
                                onClick={this.recoveryClickHandler}
                            />
                            <p>{this.state.paths.length!==0?this.state.paths:"No paths"}</p>
                        </div>
                        : <div>
                            <input
                                className="btn btn-primary"
                                type="submit"
                                value="Find Recovery Path"
                                style={{padding: "9px",width: "90%"}}
                                onClick={this.recoveryClickHandler}
                            />
                        </div>
                }
            </div>
        )
    }
}
export default path
