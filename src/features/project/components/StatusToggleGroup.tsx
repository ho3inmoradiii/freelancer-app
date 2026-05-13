import { useSearchParams } from "react-router-dom";
import {
    SegmentedControl,
    type SegmentedControlOption,
} from "@/components/ui/segmented-control";
import { useState, useEffect } from "react";
import { PROJECT_STATUSES } from "../constants/project-statuses";

const statusOptions: SegmentedControlOption[] = [
    { label: "همه", value: PROJECT_STATUSES.ALL },
    { label: "باز", value: PROJECT_STATUSES.OPEN },
    { label: "بسته", value: PROJECT_STATUSES.CLOSED },
];

export function StatusToggleGroup() {
    const [searchParams, setSearchParams] = useSearchParams();
    const urlStatus = searchParams.get("status") || "ALL";

    const [activeStatus, setActiveStatus] = useState(urlStatus);

    useEffect(() => {
        setActiveStatus(urlStatus);
    }, [urlStatus]);

    const handleStatusChange = (newStatus: string) => {
        setActiveStatus(newStatus);

        setSearchParams(prev => {
            prev.set('status', newStatus);
            return prev;
        });
    }

    return (
        <SegmentedControl
            label="وضعیت"
            options={statusOptions}
            value={activeStatus}
            onValueChange={handleStatusChange}
        />
    )
}
