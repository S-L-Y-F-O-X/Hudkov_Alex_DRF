import React from 'react';

import {BrandAndModelManager} from "../components/BrandAndModelManager";
import {AdminCarManager} from "../components/AdminCarManager";
import {AdminUserManager} from "../components/AdminUserManager";

const SuperAdminPage = () => {
    return (
        <div>
            <AdminCarManager/>
            <AdminUserManager/>
            <BrandAndModelManager/>
        </div>
    );
};

export {SuperAdminPage};