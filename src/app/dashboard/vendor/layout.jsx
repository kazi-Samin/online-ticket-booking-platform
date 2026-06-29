import { requireRole } from '@/lib/api/session';
import { chipVariants } from '@heroui/styles';


const VendorLayout = async({children}) => {
    await requireRole('vendor');
    return children
};

export default VendorLayout; 