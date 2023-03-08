import React,{Component} from "react";
import axios from "axios";
class Farmer extends Component{
    constructor(props)
    {
        super(props);
        this.state={
        crop:"",
        revenue:"",
        product:"",
        farmerName:"",
        soilType:"",
        farmEquipment:"",
        livestock:"",
        showsdata:[],
    };
    }
    componentDidMount(){
        axios.get("http://localhost:8080/showFarmer")
        .then(response =>{
            this.setState({
                showsdata:response.data
            });
        });
    }
    handlecrop = (event) =>{
        this.setState({ crop : event.target.value});
    };
    handlerev = (event) =>{
        this.setState({ revenue : event.target.value});
    };
    handleprod = (event) =>{
        this.setState({ product : event.target.value});
    };
    handlefname = (event) =>{
        this.setState({ farmerName : event.target.value});
    };
    handlesoil = (event) =>{
        this.setState({ soilType : event.target.value});
    };
    handlefarm=(event)=>{
        this.setState({ farmEquipment : event.target.value});
    }
    handlelive=(event)=>{
        this.setState({livestock:event.target.value});
    }
    handleSubmit = (event) => {
        event.preventDefault();
        const data ={
            crop: this.state.crop,
            revenue: this.state.revenue,
            product: this.state.product,
            farmerName: this.state.farmerName,
            soilType: this.state.soilType,
            farmEquipment:this.state.farmEquipment,
            livestock:this.state.livestock,
        };
        console.log(data);
        axios.post("http://localhost:8080/addfarmer",data).then((response)=>{
            this.setState({
                showsdata:[...this.state.showsdata,response.data],
                crop:"",
                revenue:"",
                product:"",
                farmerName:"",
                soilType:"",
                farmEquipment:"",
                livestock:"",
            });
        });
    };
    

    handleDelete = (id) => {
        // Send DELETE request to remove fuel data with the given ID
        axios.delete(`http://localhost:8080/del/${id}`).then((response) => {
            // Update the state to remove the deleted fuel data
            const updateData = this.state.showsdata.filter(
                (user) => user.id !== id
            );
            this.setState({ showsdata: updateData });
        });
    };
    handleEdit = (data) => {
        this.setState({
            //id: data.id,
            crop: data.crop,
            revenue: data.revenue,
            product: data.product,
            farmerName: data.farmerName,
            soilType: data.soilType,
            farmEquipment: data.farmEquipment,
            livestock:data.livestock,
            isEdit: true,
        });
        console.log(this.state.id);
    };
    handleInputChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState({
            [name]: value,
        });
    };
    handleUpdate= (event) => {
        event.preventDefault();
        const data = {
            crop: this.state.crop,
            revenue: this.state.revenue,
            product: this.state.product,
            farmerName: this.state.farmerName,
            soilType:this.state.soilType,
            farmEquipment:this.state.farmEquipment,
            livestock:this.state.livestock,
        };
        const id = this.state.id;
        axios.put(`http://localhost:8080/update/${id}`, data).then((res) => {
                console.log(res.data);
                this.setState({
                    crop:"",
                    revenue:"",
                    product:"",
                    farmerName:"",
                    soilType:"",
                    farmEquipment:"",
                    livestock:"",
                });
                this.props.history.push("/");
            })
            .catch((err) => console.log(err));
    };
    render()
    {
        return(
            <div>
            <form style={{marginTop:"20px",marginLeft:"20px",marginBottom:"20px",justifyContent:"center"}} onSubmit={this.handleSubmit} className="tab" >
               <label>crop</label>
               <input
               className="tab"
               type="text"
               style={{marginBottom:"10px"}}
               onChange={this.handlecrop}
               value={this.state.crop}
               /><br></br>
               <label>revenue</label>
               <input
               className="tab"
               type="number"
               style={{marginBottom:"10px"}}
               onChange={this.handlerev}
               value={this.state.revenue}
               /><br></br>
               <label>product</label>
               <input
               className="tab"
               type="text"
               style={{marginBottom:"10px"}}
               onChange={this.handleprod}
               value={this.state.product}
               /><br></br>
               <label>farmerName</label>
               <input
               className="tab"
               type="text"
               style={{marginBottom:"10px"}}
               onChange={this.handlefname}
               value={this.state.farmerName}
               /><br></br>
               <label>soilType</label>
               <input
               className="tab"
               type="text"
               style={{marginBottom:"10px"}}
               onChange={this.handlesoil}
               value={this.state.soilType}
               /><br></br>
               <label>farmEquipment</label>
               <input
               className="tab"
               type="text"
               style={{marginBottom:"10px"}}
               onChange={this.handlefarm}
               value={this.state.farmEquipment}
               />
               <br/>
            <label>livestock</label>
               <input
               className="tab"
               type="text"
               style={{marginBottom:"10px"}}
               onChange={this.handlelive}
               value={this.state.livestock}
               />
               <br></br>
               <button style={{width:"100px"}}className="submitt" type="submit">SUBMIT</button>
               </form>
               <table className="output" border={2}>
               <thead>
                   <tr>
                       <th>Id</th>
                       <th>crop</th>
                       <th>revenue</th>
                       <th>product</th>
                       <th>farmerName</th>
                       <th>soilType</th>
                       <th>farmEquipment</th>
                       <th>livestock</th>
                       <th>Edit</th>
                       <th>Delete</th>
                   </tr>
               </thead>
               <tbody>
                   {this.state.showsdata.map((data) => (
                       <tr key={data.id}>
                           <td>{data.id}</td>
                           <td>{data.crop}</td>
                           <td>{data.revenue}</td>
                           <td>{data.product}</td>
                           <td>{data.farmerName}</td>
                           <td>{data.soilType}</td>
                           <td>{data.farmEquipment}</td>
                           <td>{data.livestock}</td>
                           <td>
                               <button onClick={() => this.handleEdit(data)}>Edit</button>
                           </td>
                           <td>
                               <button onClick={() => this.handleDelete(data.id)}>
                                   Delete
                               </button>
                           </td>
                       </tr>
                   ))}
               </tbody>
           </table>
           <br></br><br></br><br></br>
           <br></br>
           <form onSubmit={this.handleUpdate}>
               <input type="hidden" name="id" value={this.state.id} />
               <label>crop</label>
               <input
                   type="text"
                   name="crop"
                   value={this.state.crop}
                   onChange={this.handleInputChange}
               />
               <br />
               <label>revenue</label>
               <input
                   type="text"
                   name="revenue"
                   value={this.state.revenue}
                   onChange={this.handleInputChange}
               />
               <br />
               <label>product</label>
               <input
                   type="text"
                   name="product"
                   value={this.state.product}
                   onChange={this.handleyear}
               />
               <br />
               <label>farmerName</label>
               <input
                   type="text"
                   name="farmerName"
                   onChange={this.handleInputChange}
                   value={this.state.farmerName}
               />
               <br />
               <label>soilType</label>
               <input
                   type="text"
                   name="soilType"
                   onChange={this.handleInputChange}
                   value={this.state.soilType}
               />
               <br />
               <label>farmEquipment</label>
               <input
                   type="text"
                   name="farmEquipment"
                   onChange={this.handleInputChange}
               value={this.state.farmEquipment}
               />
               <br/>

                <label>livestock</label>
               <input
                   type="text"
                   name="livestock"
                   onChange={this.handleInputChange}
               value={this.state.livestock}
               />
               <br />
               <button type="submit">Save</button>
           </form>     
           </div>
               );
               
    }
}
export default Farmer;