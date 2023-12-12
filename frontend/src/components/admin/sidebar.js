import React from "react";

const Sidebar = () => {
    return (
        <div className="row">
            <div className="col-2">
                <div className="sidebar-wrapper">
                    <nav id="sidebar">
                        <ul className="list-unstyled components">
                            <li>
                                <a href="/dashboard"><i className="fa fa-tachometer"></i> Dashboard</a>
                            </li>

                            <li>
                                <a href="#productSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle"><i
                                    className="fa fa-product-hunt"></i>Products</a>
                                <ul className="collapse list-unstyled" id="productSubmenu">
                                    <li>
                                        <a href="/admin/products"><i className="fa fa-clipboard-list"></i>All</a>
                                    </li>

                                    <li>
                                        <a href="/admin/product/novo"><i className="fa fa-plus"></i> Create</a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>

    )
}
export default Sidebar;