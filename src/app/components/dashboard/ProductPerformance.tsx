"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CardBox from "../shared/CardBox";
import { Badge } from "@/components/ui/badge";
import { useLocale } from "@/lib/i18n/context";

export const ProductPerformance = () => {
  const { t } = useLocale();
  const PerformersData = [
    {
      key: "performerData1",
      username: "Sunil Joshi",
      designation: "Web Designer",
      project: "Elite Admin",
      priorityKey: "low",
      color: "primary",
      bgcolor: "bg-primary text-white",
      budget: "3.9k",
    },
    {
      key: "performerData2",
      username: "Andrew McDownland",
      designation: "Project Manager",
      project: "Real Homes WP Theme",
      priorityKey: "medium",
      color: "secondary",
      bgcolor: "bg-secondary text-white",
      budget: "24.5k",
    },
    {
      key: "performerData3",
      username: "Christopher Jamil",
      designation: "Project Manager",
      project: "MedicalPro WP Theme",
      priorityKey: "high",
      color: "error",
      bgcolor: "bg-error text-white",
      budget: "12.8k",
    },
    {
      key: "performerData4",
      username: "Nirav Joshi",
      designation: "Frontend Engineer",
      project: "Hosting Press HTML",
      priorityKey: "critical",
      color: "success",
      bgcolor: "bg-success text-white",
      budget: "4.8k",
    },
    {
      key: "performerData5",
      username: "Micheal Doe",
      designation: "Content Writer",
      project: "Helping Hands WP Theme",
      priorityKey: "low",
      color: "primary",
      bgcolor: "bg-primary text-white",
      budget: "9.3k",
    },
  ];
  const priorityLabel: Record<string, string> = {
    low: t.table.low,
    medium: t.table.medium,
    high: t.table.high,
    critical: t.table.critical,
  };
  return (
    <CardBox>
      <div id="product" className="mb-6">
        <div>
          <h5 className="card-title">{t.dashboard.productPerformance}</h5>
          <p className="text-sm text-muted-foreground font-normal">
            {t.dashboard.overviewProduct}
          </p>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-sm font-semibold">Id</TableHead>
                    <TableHead className="text-sm font-semibold">
                      {t.table.assigned}
                    </TableHead>
                    <TableHead className="text-sm font-semibold">
                      {t.table.name}
                    </TableHead>
                    <TableHead className="text-sm font-semibold">
                      {t.table.priority}
                    </TableHead>
                    <TableHead className="text-sm font-semibold">
                      {t.table.budget}
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {PerformersData.map((item, index) => (
                    <TableRow key={item.key} className="border-b border-border">
                      <TableCell>
                        <p className="text-muted-foreground font-medium text-sm">
                          {index + 1}
                        </p>
                      </TableCell>

                      <TableCell className="ps-0 min-w-[200px]">
                        <div>
                          <h6 className="text-sm font-semibold mb-1">
                            {item.username}
                          </h6>
                          <p className="text-xs font-medium text-muted-foreground">
                            {item.designation}
                          </p>
                        </div>
                      </TableCell>

                      <TableCell>
                        <p className="font-medium text-muted-foreground text-sm">
                          {item.project}
                        </p>
                      </TableCell>

                      <TableCell>
                        <Badge
                          className={`text-[13px] px-3 rounded-full justify-center py-0.5 ${item.bgcolor}`}
                        >
                          {priorityLabel[item.priorityKey]}
                        </Badge>
                      </TableCell>

                      <TableCell>
                        <p className="text-muted-foreground text-[15px] font-medium">
                          {item.budget}
                        </p>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </CardBox>
  );
};
