pragma solidity ^0.5.0;

contract SocialNetwork {

    uint public postcount=0;
    uint public subjectcount=0;
    struct Post{
        uint id;
        string sname;
        uint age;
        //string subject;
        string degree;
        string resume;
        string photo;
        string content;
        uint tipAmount;
        address payable author;
    }
    // struct HashFiles{
    //     string resume;
    //     string photo;
    // }
    event PostCreated(
        uint id,
        string sname,
        uint8 age,
        //string subject,
        string degree,
        string content,
        //uint tipAmount,
        address payable author   );



        struct Subject{
            uint id;
            string subjectname;
            string notehash;
            address payable creator;
            uint tipAmount;
        }
        event subjectevent(
            string subjectname,
            string notehash
        );

    mapping(uint=>Post) public posts;
    mapping(uint=>Subject) public subjects;
    function createPost(
        string memory sname,
        uint8 age,
        string memory degree,
        string memory resume,
        string memory photo,
        string memory content) public
    {
        require(bytes(content).length > 0);
        postcount++;
        posts[postcount] = Post(postcount,sname,age,degree,resume,photo,content,0,msg.sender);
        emit PostCreated(postcount,sname,age,degree,content,msg.sender);

    }

    function subjectupload(string memory name,string memory notehash) public{
        subjectcount++;
        subjects[subjectcount] = Subject(subjectcount,name,notehash,msg.sender,0);



    }
    function displayprofiles(uint id) public{
        require(id < 0);
        for (uint i = 1; i < subjectcount ;i++)
        {
            if(subjects[i].creator==posts[i].author)
                emit subjectevent(subjects[i].subjectname,subjects[i].notehash);

        }

    }
    // function uploadFiles(
    //     //write a modifier msg.sender should have uploded details
    //     string memory _photohash,
    //     string memory _resumehash) public
    // {
    //     hashfiles[msg.sender] = HashFiles(_resumehash,_photohash);

    // }

    function tipPost(uint _id) public payable {
        require(_id > 0 && _id >= postcount);
        Post memory _post = posts[_id];
        address payable _author = _post.author;

        //pay the author
        address(_author).transfer(msg.value);
        _post.tipAmount =_post.tipAmount+msg.value;
        posts[_id] =_post;
    }
}