export default {
    template: `
    <div class="container mt-5">
    <div class="card bg-dark text-white ">
        <div class="card-header ">
            Create Product
        </div>
        <div class="card-body centerer  ">

            <div class="form-group row limit_row_width">
                <label for="title" class="col-sm-4 col-form-label">Product Name:</label>
                <div class="col-sm-8">
                    <input type="text" class="form-control" id="title" v-model="prod_name" />
                </div>
            </div>

            <div class="form-group row limit_row_width">
                <label for="sec_id" class="col-sm-4 col-form-label">Product Section Id:</label>
                <div class="col-sm-8">
                    <input type="number" class="form-control" id="sec_id" v-model="prod_sec_id" />
                </div>
            </div>

            <div class="form-group row limit_row_width">
                <label for="desc" class="col-sm-4 col-form-label">Product Description:</label>
                <div class="col-sm-8">
                    <input type="text" class="form-control" id="desc" v-model="prod_desc" />
                </div>
            </div>

            <div class="form-group row limit_row_width">
                <label for="stock" class="col-sm-4 col-form-label">Current Stock:</label>
                <div class="col-sm-8">
                    <input type="number" class="form-control" id="stock" v-model="prod_stock" />
                </div>
            </div>

            <div class="form-group row limit_row_width">
                <label for="in_stock" class="col-sm-4 col-form-label">In Stock?</label>
                <div class="col-sm-8">
                    <input type="checkbox" class="form-check-input" id="in_stock" v-model="prod_in_stock" />
                </div>
            </div>

            <div class="form-group row limit_row_width">
                <label for="price" class="col-sm-4 col-form-label">Product Price:</label>
                <div class="col-sm-8">
                    <input type="number" class="form-control" id="price" v-model="prod_price" />
                </div>
            </div>

            <div class="form-group row limit_row_width">
                <label for="unit" class="col-sm-4 col-form-label">Per Unit:</label>
                <div class="col-sm-8">
                    <input type="text" class="form-control" id="unit" v-model="prod_unit" />
                </div>
            </div>

            <div class="form-group row limit_row_width">
                <label for="mfg_date" class="col-sm-4 col-form-label">Manufacturing Date:</label>
                <div class="col-sm-8">
                    <input type="date" class="form-control" id="mfg_date" v-model="prod_mfg_date" />
                </div>
            </div>

            <div class="form-group row limit_row_width">
                <label for="exp_date" class="col-sm-4 col-form-label">Expiry Date:</label>
                <div class="col-sm-8">
                    <input type="date" class="form-control" id="exp_date" v-model="prod_exp_date" />
                </div>
            </div>

            <div class="form-group row limit_row_width">
                <div class="col-sm-12">
                    <button class="btn btn-primary" @click="createProduct">Create Product</button>
                </div>
            </div>

        </div>
    </div>
</div>

    `,
    data(){
        return {
            prod_name: '',
            prod_sec_id: '',
            prod_desc: '',
            prod_stock: '',
            prod_in_stock: '',
            prod_price: '',
            prod_unit: '',
            prod_mfg_date: '',
            prod_exp_date: '',
            product_image:'NOTHING',
        }
    },
    mounted(){

    },
    created(){

    },
    methods:{
        async createProduct(){

            const prod_url = 'api/newproduct'
            console.log("prod_url")
            const prod_data = {
                "product_name": this.prod_name,
                "section_id": this.prod_sec_id,
                "product_desc": this.prod_desc,
                "curr_stock": this.prod_stock,
                "in_stock": Boolean(this.prod_in_stock),
                "product_price": this.prod_price,
                "per_what": this.prod_unit,
                "product_image": this.product_image,
                "mfg_date": this.prod_mfg_date,
                "exp_date": this.prod_exp_date,
                "creation_date": new Date(),
            }
            console.log(prod_data)
            const res= await fetch(prod_url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authentication-Token": localStorage.getItem("Authentication-Token"),
                },
                body: JSON.stringify(prod_data),
            })
            if(res.ok){
                const dataa=await res.json();
                console.log(dataa)
                if (dataa.message == null){
                    console.log("product created")
                    this.$router.push({name: 'smhome'})
                }
            }
        }
    }
}