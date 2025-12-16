import { Button } from '@repo/ui/components/button';
import { Spinner } from '@repo/ui/components/spinner';
import { useFileDownload } from '@repo/ui/hooks/useFileDownload';
import { File } from 'lucide-react';
import { useCallback } from 'react';

const ExportInvoice = ({ id }: { id: string }) => {
  const { downloadFile, isLoading } = useFileDownload();

  const handleExportInvoice = useCallback(() => {
    downloadFile({
      url: `http://localhost:8001/api/v1/parcel/admin/parcel/export/pdf/${id}`,
      fileName: 'report.pdf',
      fileType: 'application/pdf',
      refreshTokenUrl: 'http://localhost:8001/api/v1/auth/admin/refresh-token',
    });
  }, [downloadFile]);

  return (
    <Button
      size="icon"
      variant="outline"
      className="size-5 rounded"
      disabled={isLoading}
      onClick={handleExportInvoice}
    >
      {isLoading ? <Spinner /> : <File />}
    </Button>
  );
};

export default ExportInvoice;
