pragma solidity ^0.5.0;

contract School
{
    uint public schoolcount=0;
    uint public fundercount=0;
    uint public fundlogcount=0;

    struct Schoolstruct{
        uint id;
        string sname;
        string location;
        address payable schooladdress;
        uint fundingamount;
    }

    // struct Fundlog{
    //     uint fundlogid;
    //     address payable fundsender;
    //     address payable fundreseviver;
    //     //need to show who gave the money
    //     uint funderid;

    // }

    struct Funder{
        uint id;
        string name;
        string job;
        address payable funderaddress;

    }

    mapping (address=>Funder) public funder;
    mapping(uint=>Schoolstruct) public schoolstruct;
    //mapping (uint=>Fundlog) public fundlog;

    function registerschool(string memory _sname,string memory _location) public
    {
        schoolcount++;
        schoolstruct[schoolcount] = Schoolstruct(schoolcount,_sname,_location,msg.sender,0);
    }
    function registerfunder(string memory _name,string memory _job) public {

        fundercount++;
        funder[msg.sender] = Funder(fundercount,_name,_job,msg.sender);


    }

    // function fundschool(uint _id) public payable {
    //     require(_id > 0 && _id >= schoolcount);
    //     Schoolstruct memory _schoolstruct = schoolstruct[_id];
    //     address payable _schooladdress = _schoolstruct.schooladdress;

    //     //pay the author
    //     address(_schooladdress).transfer(msg.value);
    //     _schoolstruct.fundingamount = _schoolstruct.fundingamount+msg.value;
    //     schoolstruct[_id] =_schoolstruct;
    //     uint _funderid = 0;
    //     for(uint i = 1;i <= fundercount; i++)
    //      {
    //          if(funder[i].funderaddress==msg.sender)
    //             {
    //                 _funderid = i;
    //                 break;

    //             }

    //      }
    //     fundlogcount++;
    //     fundlog[fundlogcount] = Fundlog(fundlogcount,msg.sender,_schooladdress,_funderid);


    // }


     function fundschool(uint _id) public payable {
        require(_id > 0 && _id >= schoolcount);
        Schoolstruct memory _schoolstruct = schoolstruct[_id];
        address payable _schooladdress = _schoolstruct.schooladdress;

        //pay the author
        address(_schooladdress).transfer(msg.value);
        _schoolstruct.fundingamount = _schoolstruct.fundingamount+msg.value;
        schoolstruct[_id] =_schoolstruct;
        
    }




}