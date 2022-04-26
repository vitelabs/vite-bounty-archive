import React from 'react'
import profile from '../empty-profile.png'
import { CgProfile } from "react-icons/cg";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaGithubSquare } from 'react-icons/fa';
import ProfilePic from './ProfilePic'
import axios from 'axios'
import { useContext } from 'react'
import { userContext } from '../Context'

// ADD AUTHENTICATION SO ONLY USER CAN EDIT OWN PROFILE


const EditVuilder = (props) => {
    const context = useContext(userContext)
    const location = useLocation();
    const vuilder_id = location.pathname.replace("/edit","").replace("/vuilder/", "")

    const [header, setHeader] = useState("")
    const [blog, setBlog] = useState("")
    const [github, setGithub] = useState("");
    const [file, setFile] = useState(null)

    const handleOnChange = (e, editor) => {
        const data = editor.getData();
        setBlog(data)
    }
    console.log(context)
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const updateProfile = {
            userId: vuilder_id,
            header: header,
            blog: blog,
            github: github
        };
        if(file){
            const data = new FormData();
            const filename = Date.now()+ file.name;
            data.append("name", filename)
            data.append("file", file)
            updateProfile.profilePic = filename;
            try{
                const res = await axios.post("/upload", data)
                console.log(res)
            }catch(err){
                console.log(err)
            }
        }
        try{
            const res = await axios.put("/user/update/"+vuilder_id, updateProfile)
            // window.location.replace('/vuilder/'+vuilder_id)
        }catch (err) {
            console.log(err)
        }

    }
    var newfile;
    if(file){
        newfile = URL.createObjectURL(file);
    }else{
        newfile = undefined;
    }
    if(context._id === vuilder_id){
        return (
            <div id="edit-vuilders" className="l-border">
                <div className="l-txt edit-header">
                    Edit Profile
                </div>
                <div className="line sm-ta"></div>
                <div className="sm-ta">
                    <Link to={`/vuilder/${vuilder_id}`}>
                        <div className="sec-btn sb-ta">
                            Back
                        </div>
                    </Link>
                </div>
                <div>
                    <form action="" onSubmit={handleSubmit}>
                        <div>
                            <div className="edit-pic-wrap">
                                <ProfilePic profilePic={newfile} edit={true}/>
                                <div className="file-wrap">
                                    <input name="files" type="file" classButton="file-input" onChange={(e) => setFile(e.target.files[0])}/>
                                </div>
                            </div>
                            
                            <div className="header-input-wrap">
                                <input onChange={(e) => (setHeader(e.target.value))} name="header-input" type="text" className="header-input" placeholder="Enter Header Text"/>
                            </div>
                            <div className="editor-wrap">
                                <div className="text-editor">
                                    <CKEditor
                                        editor={ ClassicEditor }
                                        data=""
                                        onChange = {handleOnChange}
                                    />
                                    <input type="text" value={blog} hidden/>
                                </div>
                            </div>
                            <div className="social-edit-main">
                                <div className="social-edit-wrap">
                                    <div className="social-wrap">
                                        <div className="social-icon"><FaGithubSquare /></div>
                                        <div className="social-input-wrap"><input onChange={(e) => (setGithub(e.target.value))} name="social-input" className="social-input" type="text"  placeholder="Enter Github"/></div>
                                    </div>
                                </div>
                            </div>
                            <div className="edit-input-wrap">
                                <input className="edit-submit sec-btn" value="Save Changes" type="submit" />
                            </div>
                            
                        </div>
                        
                    </form>
                </div>
            </div>
        )
    }else{
        return (
            <div> You are not suppose to be here! </div>
        )
    }
    
}

export default EditVuilder