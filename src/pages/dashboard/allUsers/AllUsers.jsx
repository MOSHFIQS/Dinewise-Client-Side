import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SectionTitle from "../../../components/sectionTitle/SectionTitle";
import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from 'sweetalert2'
import { GrUserAdmin } from "react-icons/gr";
import toast from "react-hot-toast";

const AllUsers = () => {
    const axiosSecure = useAxiosSecure()
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users')
            return res.data
        }
    })


    const handleDeleteUsers = (id) => {
        console.log(id)
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "delete user"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`users/admin/${id}`)
                    .then(res => {
                        console.log(res)
                        // if (res.data.deletedCount > 0) {
                        // Swal.fire({
                        //     title: "User Deleted Successfully",
                        //     text: "🥳🥳🥳🥳🥳🥳🥳",
                        //     icon: "success"
                        // });
                        // }
                        refetch()
                    })
                    .catch(err => {
                        toast.success('something went wrong')
                    })
            }
        });

    }

    const handleMakeAdmin = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Make Admin"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.patch(`users/admin/${id}`)
                    .then(res => {
                        // console.log(res)
                        // if (res.data.modifiedCount > 0) {
                        // Swal.fire({
                        //     title: "Admin Created Successfully",
                        //     text: "🥳🥳🥳🥳🥳🥳🥳",
                        //     icon: "success"
                        // });
                        // }
                        refetch()
                    })
            }
        });
    }


    return (
        <div className={'max-w-[75vw] mx-auto '} >
            <SectionTitle Heading={'Manage All Users'} subHeading={'----How Many----'} />
            <div className='bg-gray-100 p-1'>
                <div className='flex justify-between items-center  p-4  font-extrabold uppercase'>
                    <h4 className=''>total Users {users.length}</h4>
                </div>
                <div className="overflow-x-auto">
                    <table className="table  mt-4">
                        {/* head */}
                        <thead className='bg-gray-300 '>
                            <tr>
                                <th>

                                </th>
                                <th>Name</th>
                                <th> Email</th>
                                <th>Role</th>
                                <th>action</th>
                            </tr>
                        </thead>


                        {
                            users.map((singleUsers, idx) => (
                                <tbody className='' key={idx}>
                                    <tr>
                                        <th>
                                            <label>
                                                {idx + 1}
                                            </label>
                                        </th>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div>
                                                    <div className="font-bold">{singleUsers.name}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            {singleUsers.email}
                                        </td>
                                        <td>
                                            {
                                                singleUsers.role == 'admin' ? "admin" : <button onClick={() => handleMakeAdmin(singleUsers._id)} className="btn btn-error text-white btn-sm" ><GrUserAdmin size={20} /></button>
                                            }
                                        </td>
                                        <th>
                                            <button onClick={() => handleDeleteUsers(singleUsers._id)} className="btn btn-error text-white btn-sm" ><RiDeleteBin6Line size={20} /></button>
                                        </th>
                                    </tr>

                                </tbody>
                            ))
                        }




                    </table>
                </div>
            </div>
        </div>
    );
};

export default AllUsers;