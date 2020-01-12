const SocialNetwork = artifacts.require("SocialNetwork");
require("chai").use(require('chai-as-promised')).should()


contract('Social Network',([deployer,author,tipper])=>{
    let socialNetwork
    before(async() => {
        socialNetwork = await SocialNetwork.deployed();

    });
    describe('deployement',async () => {
        it("deploys succesfully",async()=>{
            
         
                  
            const address= await socialNetwork.address
            assert.notEqual(address, 0x0);
            assert.notEqual(address, '');
            assert.notEqual(address, null);
            assert.notEqual(address, undefined);

        })
        
    });
    describe('posts',async () => {
        it ('create posts',async()=>{
                await socialNetwork.createPost("this is my first post",{from:author})
        })
        it ('lists posts',async()=>{
            
        })
        it ('allow users ti tip posts',async()=>{
            
        })
        
    });
})