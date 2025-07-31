import { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { fetchArtworks } from "../utils/api";
import type { Artwork } from "../types/artwork";
import { Skeleton } from "primereact/skeleton";
import { SelectedArtworksBanner } from "./SelectedArtworksBanner";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";

export const ArtworksTable = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [selectedRows, setSelectedRows] = useState<Record<number, Artwork>>({});
  const [totalRecords, setTotalRecords] = useState(0);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [autoSelectCount, setAutoSelectCount] = useState<number>(0);

  const pageSize = 12;

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const { data, total } = await fetchArtworks(page + 1);
      setArtworks(data.slice(0, pageSize));
      setTotalRecords(total);
      setLoading(false);
    };
    load();
  }, [page]);

  const handleAutoSelectClick = async () => {
    if (autoSelectCount <= 0) return;

    let remaining = autoSelectCount;
    let pageToFetch = 1;
    const updated: Record<number, Artwork> = {};

    while (remaining > 0) {
      const { data } = await fetchArtworks(pageToFetch);
      for (const artwork of data) {
        if (remaining === 0) break;
        updated[artwork.id] = artwork;
        remaining--;
      }
      pageToFetch++;
    }

    setSelectedRows(updated);
  };


  const renderSkeletonRows = () => {
    return [...Array(pageSize)].map((_, i) => ({
      id: `skeleton-${i}`,
      title: <Skeleton width="100%" height="1.2rem" />,
      place_of_origin: <Skeleton width="80%" />,
      artist_display: <Skeleton width="90%" />,
      inscriptions: <Skeleton width="70%" />,
      date_start: <Skeleton width="40%" />,
      date_end: <Skeleton width="40%" />,
    }));
  };

  return (
    <>
      <SelectedArtworksBanner selectedArtworks={selectedRows} />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAutoSelectClick();
        }}
        className="flex align-items-center gap-2 mb-3"
      >
        <span className="font-medium">Select N Rows:</span>
        <InputNumber
          value={autoSelectCount}
          onValueChange={(e) => setAutoSelectCount(e.value ?? 0)}
          min={0}
          max={totalRecords}
          showButtons
          step={1}
          placeholder="Rows"
          inputStyle={{ width: "4rem" }}
        />
        <Button
          label="Select"
          size="small"
          type="submit"
          disabled={autoSelectCount <= 0}
        />
      </form>

      {loading && (
        <div className="flex justify-content-center p-3 mb-3 border-round shadow-2 bg-yellow-50 text-yellow-900 font-medium">
          <i className="pi pi-spinner pi-spin mr-2"></i>
          Fetching data from API...
        </div>
      )}

      <DataTable
        value={loading ? renderSkeletonRows() : artworks}
        loading={loading}
        paginator
        first={page * pageSize}
        rows={pageSize}
        totalRecords={totalRecords}
        onPage={(e) => setPage(e.page ?? page)}
        lazy
        tableStyle={{ minWidth: "60rem" }}
        selection={artworks.filter((row) => selectedRows[row.id])}
        onSelectionChange={(e) => {
          const updated: Record<number, Artwork> = { ...selectedRows };

          artworks.forEach((row) => {
            delete updated[row.id];
          });

          (e.value as Artwork[]).forEach((row) => {
            updated[row.id] = row;
          });

          setSelectedRows(updated);
        }}
        selectionMode="multiple"
        dataKey="id"
      >
        <Column selectionMode="multiple" style={{ width: "3rem" }} />
        <Column field="title" header="Title" />
        <Column field="place_of_origin" header="Origin" />
        <Column field="artist_display" header="Artist" />
        <Column field="inscriptions" header="Inscriptions" />
        <Column field="date_start" header="Start Year" />
        <Column field="date_end" header="End Year" />
      </DataTable>
    </>
  );
};
