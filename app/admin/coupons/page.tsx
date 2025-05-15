"use client"

import { useState } from "react"
import { Search, Pencil, Trash, Plus, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface Coupon {
  id: number
  name: string
  code: string
  discount: string
  usage: string
  status: "Active" | "Expired"
  date: string
}

// Sample coupon data
const initialCoupons: Coupon[] = [
  { 
    id: 1, 
    name: "Summer discount 10% off", 
    code: "Summer2020", 
    discount: "10%", 
    usage: "15 times", 
    status: "Active", 
    date: "May 5, 2020 - May 15, 2020" 
  },
  { 
    id: 2, 
    name: "Discount for women clothes 5%", 
    code: "Womenclothing5", 
    discount: "5%", 
    usage: "12 times", 
    status: "Active", 
    date: "April 12, 2020 - April 20, 2020" 
  },
  { 
    id: 3, 
    name: "Summer discount 10% off", 
    code: "Summer2020", 
    discount: "10%", 
    usage: "8 times", 
    status: "Active", 
    date: "April 12, 2020 - April 20, 2020" 
  },
  { 
    id: 4, 
    name: "Summer discount 10% off", 
    code: "Summer2020", 
    discount: "10%", 
    usage: "8 times", 
    status: "Active", 
    date: "April 12, 2020 - April 20, 2020" 
  },
  { 
    id: 5, 
    name: "Black Friday Special", 
    code: "BFRIDAY", 
    discount: "25%", 
    usage: "22 times", 
    status: "Expired", 
    date: "November 20, 2023 - November 30, 2023" 
  },
  { 
    id: 6, 
    name: "New Year Offer", 
    code: "NEWYEAR2024", 
    discount: "15%", 
    usage: "5 times", 
    status: "Expired", 
    date: "January 1, 2024 - January 15, 2024" 
  },
]

export default function CouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>(initialCoupons)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null)
  const [newCoupon, setNewCoupon] = useState<Omit<Coupon, "id">>({
    name: "",
    code: "",
    discount: "",
    usage: "0 times",
    status: "Active",
    date: `${new Date().toLocaleDateString()} - ${new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString()}`
  })
  const [couponType, setCouponType] = useState("percentage")

  // Filter coupons based on search query and active tab
  const filteredCoupons = coupons.filter(
    (coupon) => {
      const matchesSearch = 
        coupon.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        coupon.code.toLowerCase().includes(searchQuery.toLowerCase());
      
      if (activeTab === "all") return matchesSearch;
      if (activeTab === "active") return matchesSearch && coupon.status === "Active";
      if (activeTab === "expired") return matchesSearch && coupon.status === "Expired";
      
      return false;
    }
  )

  // Handle adding a new coupon
  const handleAddCoupon = () => {
    if (editingCoupon) {
      // Update existing coupon
      setCoupons(
        coupons.map((coupon) => (coupon.id === editingCoupon.id ? { ...newCoupon, id: editingCoupon.id } : coupon))
      )
    } else {
      // Add new coupon
      setCoupons([...coupons, { ...newCoupon, id: coupons.length + 1 }])
    }
    resetCouponForm()
  }

  // Handle opening the edit dialog
  const handleEditClick = (coupon: Coupon) => {
    setEditingCoupon(coupon)
    setNewCoupon({ ...coupon })
    setCouponType(coupon.discount.includes("%") ? "percentage" : "price")
    setIsDialogOpen(true)
  }

  // Handle deleting a coupon
  const handleDeleteCoupon = (id: number) => {
    setCoupons(coupons.filter((coupon) => coupon.id !== id))
  }

  // Reset the coupon form
  const resetCouponForm = () => {
    setEditingCoupon(null)
    setNewCoupon({
      name: "",
      code: "",
      discount: "",
      usage: "0 times",
      status: "Active",
      date: `${new Date().toLocaleDateString()} - ${new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString()}`
    })
    setCouponType("percentage")
    setIsDialogOpen(false)
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Coupons</h2>
          <p className="text-muted-foreground">Manage discount coupons for your customers</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="shrink-0">
              <Plus className="mr-2 h-4 w-4" /> 
              Add Coupon
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{editingCoupon ? "Edit Coupon" : "Add Coupon"}</DialogTitle>
              <DialogDescription>
                {editingCoupon 
                  ? "Update coupon information in the form below."
                  : "Fill in the coupon information below to create a new discount coupon."
                }
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="code" className="text-right">
                  Coupon Code
                </Label>
                <Input
                  id="code"
                  value={newCoupon.code}
                  onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value })}
                  placeholder="SUMMER10"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Coupon Name
                </Label>
                <Input
                  id="name"
                  value={newCoupon.name}
                  onChange={(e) => setNewCoupon({ ...newCoupon, name: e.target.value })}
                  placeholder="Summer Discount"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">
                  Applies to
                </Label>
                <select
                  className="col-span-3 h-10 rounded-md border border-input bg-transparent px-3 py-2 text-sm"
                >
                  <option>All Products</option>
                  <option>Specific Category</option>
                  <option>Specific Products</option>
                </select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">
                  Duration
                </Label>
                <div className="col-span-3 flex items-center gap-2">
                  <Input
                    type="date"
                    className="flex-1"
                  />
                  <span>-</span>
                  <Input
                    type="date"
                    className="flex-1"
                  />
                </div>
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label className="text-right pt-2">
                  Coupon Type
                </Label>
                <RadioGroup defaultValue={couponType} onValueChange={setCouponType} className="col-span-3">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="percentage" id="percentage" />
                    <Label htmlFor="percentage">Percentage Discount</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="price" id="price" />
                    <Label htmlFor="price">Price Discount</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="discount" className="text-right">
                  Discount Value
                </Label>
                <div className="col-span-3 relative">
                  <Input
                    id="discount"
                    value={newCoupon.discount.replace("%", "").replace("$", "")}
                    onChange={(e) => setNewCoupon({ 
                      ...newCoupon, 
                      discount: `${e.target.value}${couponType === "percentage" ? "%" : ""}`
                    })}
                    placeholder={couponType === "percentage" ? "10" : "15.99"}
                    className="pl-7"
                  />
                  <span className="absolute left-3 top-1/2 -translate-y-1/2">
                    {couponType === "percentage" ? "%" : "$"}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="usage" className="text-right">
                  Usage Limits
                </Label>
                <Input
                  id="usage"
                  type="number"
                  min="0"
                  placeholder="Number of times the coupon can be used"
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={resetCouponForm}>
                Cancel
              </Button>
              <Button onClick={handleAddCoupon}>{editingCoupon ? "Update" : "Save"}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <div className="flex items-center justify-between pb-3">
          <TabsList>
            <TabsTrigger value="all">All Coupons</TabsTrigger>
            <TabsTrigger value="active">Active Coupons</TabsTrigger>
            <TabsTrigger value="expired">Expired Coupons</TabsTrigger>
          </TabsList>
          <div className="flex items-center border rounded-lg overflow-hidden shadow-sm w-64">
            <Search className="ml-3 h-4 w-4 text-muted-foreground shrink-0" />
            <Input
              placeholder="Search coupons..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
        </div>

        <TabsContent value="all" className="mt-0">
          <CouponTable 
            coupons={filteredCoupons} 
            onEdit={handleEditClick} 
            onDelete={handleDeleteCoupon} 
          />
        </TabsContent>
        <TabsContent value="active" className="mt-0">
          <CouponTable 
            coupons={filteredCoupons} 
            onEdit={handleEditClick} 
            onDelete={handleDeleteCoupon} 
          />
        </TabsContent>
        <TabsContent value="expired" className="mt-0">
          <CouponTable 
            coupons={filteredCoupons} 
            onEdit={handleEditClick} 
            onDelete={handleDeleteCoupon} 
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface CouponTableProps {
  coupons: Coupon[]
  onEdit: (coupon: Coupon) => void
  onDelete: (id: number) => void
}

function CouponTable({ coupons, onEdit, onDelete }: CouponTableProps) {
  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Coupon Name</TableHead>
            <TableHead>Usage</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {coupons.length > 0 ? (
            coupons.map((coupon) => (
              <TableRow key={coupon.id}>
                <TableCell>
                  <div className="font-medium">{coupon.name}</div>
                  <div className="text-sm text-muted-foreground">{coupon.code}</div>
                </TableCell>
                <TableCell>{coupon.usage}</TableCell>
                <TableCell>
                  <Badge variant={coupon.status === "Active" ? "success" : "secondary"}>
                    {coupon.status}
                  </Badge>
                </TableCell>
                <TableCell>{coupon.date}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button size="icon" variant="ghost" onClick={() => onEdit(coupon)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="icon" 
                      variant="ghost" 
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      onClick={() => onDelete(coupon.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                No coupons found. Try a different search term or create a new coupon.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
} 